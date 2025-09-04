package com.smartfarm.community

import android.content.Context
import com.smartfarm.data.KnowledgePost
import com.smartfarm.data.Comment
import com.smartfarm.data.EducationalContent
import com.smartfarm.data.Quiz
import com.smartfarm.data.Question
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.*

/**
 * Community Manager for SmartFarm Knowledge Sharing Platform
 * Facilitates expert forums, regional best practices, and educational content
 */
class CommunityManager(private val context: Context) {
    
    companion object {
        private const val TAG = "CommunityManager"
        private const val MAX_POSTS_PER_PAGE = 20
        private const val MAX_COMMENTS_PER_POST = 100
    }
    
    private val knowledgePosts = mutableListOf<KnowledgePost>()
    private val educationalContent = mutableListOf<EducationalContent>()
    private val userReputations = mutableMapOf<String, UserReputation>()
    
    init {
        // Initialize with sample data
        initializeSampleData()
    }
    
    /**
     * Create a new knowledge post
     */
    suspend fun createKnowledgePost(
        authorId: String,
        title: String,
        content: String,
        category: String,
        tags: List<String>,
        attachments: List<String> = emptyList()
    ): KnowledgePost = withContext(Dispatchers.Default) {
        try {
            val postId = generatePostId()
            val post = KnowledgePost(
                postId = postId,
                authorId = authorId,
                title = title,
                content = content,
                category = category,
                tags = tags,
                createdAt = Date(),
                likes = 0,
                comments = emptyList(),
                attachments = attachments
            )
            
            knowledgePosts.add(post)
            
            // Update user reputation
            updateUserReputation(authorId, ReputationAction.CREATE_POST)
            
            post
        } catch (e: Exception) {
            throw CommunityException("Failed to create knowledge post: ${e.message}")
        }
    }
    
    /**
     * Add comment to a knowledge post
     */
    suspend fun addComment(
        postId: String,
        authorId: String,
        content: String
    ): Comment = withContext(Dispatchers.Default) {
        try {
            val post = findKnowledgePost(postId)
                ?: throw CommunityException("Knowledge post not found")
            
            if (post.comments.size >= MAX_COMMENTS_PER_POST) {
                throw CommunityException("Maximum comments reached for this post")
            }
            
            val comment = Comment(
                commentId = generateCommentId(),
                authorId = authorId,
                content = content,
                createdAt = Date(),
                likes = 0,
                replies = emptyList()
            )
            
            // Add comment to post
            post.comments.add(comment)
            
            // Update user reputation
            updateUserReputation(authorId, ReputationAction.ADD_COMMENT)
            
            comment
        } catch (e: Exception) {
            throw CommunityException("Failed to add comment: ${e.message}")
        }
    }
    
    /**
     * Like a knowledge post
     */
    suspend fun likePost(postId: String, userId: String): Boolean = withContext(Dispatchers.Default) {
        try {
            val post = findKnowledgePost(postId)
                ?: throw CommunityException("Knowledge post not found")
            
            // Check if user already liked
            if (hasUserLikedPost(postId, userId)) {
                return false
            }
            
            post.likes++
            
            // Update author reputation
            val authorReputation = userReputations[post.authorId]
            if (authorReputation != null) {
                authorReputation.reputationScore += 5
                authorReputations[post.authorId] = authorReputation
            }
            
            // Record like
            recordUserLike(postId, userId)
            
            true
        } catch (e: Exception) {
            throw CommunityException("Failed to like post: ${e.message}")
        }
    }
    
    /**
     * Search knowledge posts
     */
    suspend fun searchPosts(
        query: String,
        category: String? = null,
        tags: List<String>? = null,
        authorId: String? = null
    ): List<KnowledgePost> = withContext(Dispatchers.Default) {
        try {
            var filteredPosts = knowledgePosts.filter { post ->
                val matchesQuery = query.isEmpty() || 
                    post.title.contains(query, ignoreCase = true) ||
                    post.content.contains(query, ignoreCase = true)
                
                val matchesCategory = category == null || post.category == category
                val matchesTags = tags == null || tags.any { tag -> post.tags.contains(tag) }
                val matchesAuthor = authorId == null || post.authorId == authorId
                
                matchesQuery && matchesCategory && matchesTags && matchesAuthor
            }
            
            // Sort by relevance and recency
            filteredPosts = filteredPosts.sortedWith(
                compareByDescending<KnowledgePost> { it.likes }
                    .thenByDescending { it.createdAt }
            )
            
            filteredPosts.take(MAX_POSTS_PER_PAGE)
        } catch (e: Exception) {
            throw CommunityException("Failed to search posts: ${e.message}")
        }
    }
    
    /**
     * Get regional best practices
     */
    suspend fun getRegionalBestPractices(region: String): List<KnowledgePost> = withContext(Dispatchers.Default) {
        try {
            knowledgePosts.filter { post ->
                post.tags.contains(region) || 
                post.tags.contains("regional") ||
                post.category == "Regional Practices"
            }.sortedByDescending { it.likes }
        } catch (e: Exception) {
            throw CommunityException("Failed to get regional practices: ${e.message}")
        }
    }
    
    /**
     * Get expert recommendations
     */
    suspend fun getExpertRecommendations(cropType: String): List<KnowledgePost> = withContext(Dispatchers.Default) {
        try {
            val expertPosts = knowledgePosts.filter { post ->
                val isExpert = userReputations[post.authorId]?.expertiseLevel == ExpertiseLevel.EXPERT
                val matchesCrop = post.tags.contains(cropType) || 
                    post.content.contains(cropType, ignoreCase = true)
                
                isExpert && matchesCrop
            }
            
            expertPosts.sortedByDescending { it.likes }
        } catch (e: Exception) {
            throw CommunityException("Failed to get expert recommendations: ${e.message}")
        }
    }
    
    /**
     * Create educational content
     */
    suspend fun createEducationalContent(
        title: String,
        description: String,
        type: String,
        difficulty: String,
        duration: Int,
        language: String,
        tags: List<String>,
        content: String,
        attachments: List<String> = emptyList(),
        quiz: Quiz? = null
    ): EducationalContent = withContext(Dispatchers.Default) {
        try {
            val contentId = generateContentId()
            val educationalContent = EducationalContent(
                contentId = contentId,
                title = title,
                description = description,
                type = type,
                difficulty = difficulty,
                duration = duration,
                language = language,
                tags = tags,
                content = content,
                attachments = attachments,
                quiz = quiz
            )
            
            this.educationalContent.add(educationalContent)
            educationalContent
        } catch (e: Exception) {
            throw CommunityException("Failed to create educational content: ${e.message}")
        }
    }
    
    /**
     * Get personalized learning path
     */
    suspend fun getPersonalizedLearningPath(
        userId: String,
        interests: List<String>,
        skillLevel: String
    ): LearningPath = withContext(Dispatchers.Default) {
        try {
            val userReputation = userReputations[userId] ?: UserReputation(userId, 0, ExpertiseLevel.BEGINNER)
            
            val recommendedContent = educationalContent.filter { content ->
                content.difficulty == skillLevel &&
                content.tags.any { tag -> interests.contains(tag) }
            }.sortedBy { it.duration }
            
            val learningPath = LearningPath(
                userId = userId,
                skillLevel = skillLevel,
                interests = interests,
                recommendedContent = recommendedContent,
                estimatedDuration = recommendedContent.sumOf { it.duration },
                progress = 0.0
            )
            
            learningPath
        } catch (e: Exception) {
            throw CommunityException("Failed to get learning path: ${e.message}")
        }
    }
    
    /**
     * Submit quiz answers
     */
    suspend fun submitQuizAnswers(
        contentId: String,
        userId: String,
        answers: Map<String, Int>
    ): QuizResult = withContext(Dispatchers.Default) {
        try {
            val content = educationalContent.find { it.contentId == contentId }
                ?: throw CommunityException("Educational content not found")
            
            val quiz = content.quiz
                ?: throw CommunityException("No quiz available for this content")
            
            val score = calculateQuizScore(quiz, answers)
            val passed = score >= quiz.passingScore
            
            // Update user reputation based on performance
            if (passed) {
                updateUserReputation(userId, ReputationAction.PASS_QUIZ)
            }
            
            QuizResult(
                contentId = contentId,
                userId = userId,
                score = score,
                totalQuestions = quiz.questions.size,
                passed = passed,
                correctAnswers = getCorrectAnswers(quiz),
                userAnswers = answers,
                feedback = generateQuizFeedback(quiz, answers)
            )
        } catch (e: Exception) {
            throw CommunityException("Failed to submit quiz: ${e.message}")
        }
    }
    
    /**
     * Get community statistics
     */
    suspend fun getCommunityStats(): CommunityStats = withContext(Dispatchers.Default) {
        try {
            val totalPosts = knowledgePosts.size
            val totalComments = knowledgePosts.sumOf { it.comments.size }
            val totalLikes = knowledgePosts.sumOf { it.likes }
            val activeUsers = userReputations.size
            val expertUsers = userReputations.count { it.value.expertiseLevel == ExpertiseLevel.EXPERT }
            
            CommunityStats(
                totalPosts = totalPosts,
                totalComments = totalComments,
                totalLikes = totalLikes,
                activeUsers = activeUsers,
                expertUsers = expertUsers,
                topCategories = getTopCategories(),
                topTags = getTopTags()
            )
        } catch (e: Exception) {
            throw CommunityException("Failed to get community stats: ${e.message}")
        }
    }
    
    // Private helper methods
    private fun initializeSampleData() {
        // Sample knowledge posts
        val samplePost = KnowledgePost(
            postId = "post_001",
            authorId = "expert_farmer_001",
            title = "Sustainable Water Management in Dry Regions",
            content = "Here are my proven techniques for managing water efficiently in arid climates...",
            category = "Water Management",
            tags = listOf("water", "sustainability", "dry regions", "irrigation"),
            createdAt = Date(),
            likes = 45,
            comments = emptyList(),
            attachments = listOf("water_management_guide.pdf")
        )
        knowledgePosts.add(samplePost)
        
        // Sample educational content
        val sampleContent = EducationalContent(
            contentId = "content_001",
            title = "Introduction to Organic Farming",
            description = "Learn the basics of organic farming practices",
            type = "Course",
            difficulty = "Beginner",
            duration = 120,
            language = "English",
            tags = listOf("organic", "beginner", "farming"),
            content = "Organic farming is a method of crop and livestock production...",
            attachments = listOf("organic_farming_intro.pdf"),
            quiz = createSampleQuiz()
        )
        educationalContent.add(sampleContent)
        
        // Sample user reputations
        userReputations["expert_farmer_001"] = UserReputation(
            userId = "expert_farmer_001",
            reputationScore = 150,
            expertiseLevel = ExpertiseLevel.EXPERT
        )
    }
    
    private fun createSampleQuiz(): Quiz {
        val questions = listOf(
            Question(
                questionId = "q1",
                question = "What is the primary goal of organic farming?",
                options = listOf(
                    "Maximum yield",
                    "Environmental sustainability",
                    "Low cost production",
                    "Fast growth"
                ),
                correctAnswer = 1,
                explanation = "Organic farming prioritizes environmental sustainability over maximum yield."
            ),
            Question(
                questionId = "q2",
                question = "Which of the following is NOT allowed in organic farming?",
                options = listOf(
                    "Crop rotation",
                    "Synthetic pesticides",
                    "Composting",
                    "Natural pest control"
                ),
                correctAnswer = 1,
                explanation = "Synthetic pesticides are not allowed in organic farming."
            )
        )
        
        return Quiz(
            quizId = "quiz_001",
            questions = questions,
            passingScore = 70,
            timeLimit = 600
        )
    }
    
    private fun findKnowledgePost(postId: String): KnowledgePost? {
        return knowledgePosts.find { it.postId == postId }
    }
    
    private fun generatePostId(): String {
        return "post_${System.currentTimeMillis()}"
    }
    
    private fun generateCommentId(): String {
        return "comment_${System.currentTimeMillis()}"
    }
    
    private fun generateContentId(): String {
        return "content_${System.currentTimeMillis()}"
    }
    
    private fun updateUserReputation(userId: String, action: ReputationAction) {
        val currentReputation = userReputations[userId] ?: UserReputation(userId, 0, ExpertiseLevel.BEGINNER)
        
        val newScore = currentReputation.reputationScore + action.points
        val newLevel = when {
            newScore >= 200 -> ExpertiseLevel.EXPERT
            newScore >= 100 -> ExpertiseLevel.INTERMEDIATE
            else -> ExpertiseLevel.BEGINNER
        }
        
        userReputations[userId] = currentReputation.copy(
            reputationScore = newScore,
            expertiseLevel = newLevel
        )
    }
    
    private fun hasUserLikedPost(postId: String, userId: String): Boolean {
        // This would typically check a database
        return false
    }
    
    private fun recordUserLike(postId: String, userId: String) {
        // This would typically record in a database
    }
    
    private fun calculateQuizScore(quiz: Quiz, answers: Map<String, Int>): Int {
        var correctAnswers = 0
        
        quiz.questions.forEach { question ->
            val userAnswer = answers[question.questionId]
            if (userAnswer == question.correctAnswer) {
                correctAnswers++
            }
        }
        
        return (correctAnswers.toDouble() / quiz.questions.size * 100).toInt()
    }
    
    private fun getCorrectAnswers(quiz: Quiz): Map<String, Int> {
        return quiz.questions.associate { it.questionId to it.correctAnswer }
    }
    
    private fun generateQuizFeedback(quiz: Quiz, answers: Map<String, Int>): List<String> {
        val feedback = mutableListOf<String>()
        
        quiz.questions.forEach { question ->
            val userAnswer = answers[question.questionId]
            if (userAnswer != question.correctAnswer) {
                feedback.add("Question: ${question.question} - ${question.explanation}")
            }
        }
        
        return feedback
    }
    
    private fun getTopCategories(): List<CategoryStats> {
        val categoryCounts = knowledgePosts.groupBy { it.category }
            .mapValues { it.value.size }
            .toList()
            .sortedByDescending { it.second }
            .take(5)
        
        return categoryCounts.map { CategoryStats(it.first, it.second) }
    }
    
    private fun getTopTags(): List<TagStats> {
        val tagCounts = knowledgePosts.flatMap { it.tags }
            .groupingBy { it }
            .eachCount()
            .toList()
            .sortedByDescending { it.second }
            .take(10)
        
        return tagCounts.map { TagStats(it.first, it.second) }
    }
}

// Data classes for community management
data class UserReputation(
    val userId: String,
    val reputationScore: Int,
    val expertiseLevel: ExpertiseLevel
)

enum class ExpertiseLevel {
    BEGINNER,
    INTERMEDIATE,
    EXPERT
}

enum class ReputationAction(val points: Int) {
    CREATE_POST(20),
    ADD_COMMENT(5),
    PASS_QUIZ(15),
    RECEIVE_LIKE(2)
}

data class LearningPath(
    val userId: String,
    val skillLevel: String,
    val interests: List<String>,
    val recommendedContent: List<EducationalContent>,
    val estimatedDuration: Int,
    val progress: Double
)

data class QuizResult(
    val contentId: String,
    val userId: String,
    val score: Int,
    val totalQuestions: Int,
    val passed: Boolean,
    val correctAnswers: Map<String, Int>,
    val userAnswers: Map<String, Int>,
    val feedback: List<String>
)

data class CommunityStats(
    val totalPosts: Int,
    val totalComments: Int,
    val totalLikes: Int,
    val activeUsers: Int,
    val expertUsers: Int,
    val topCategories: List<CategoryStats>,
    val topTags: List<TagStats>
)

data class CategoryStats(
    val category: String,
    val count: Int
)

data class TagStats(
    val tag: String,
    val count: Int
)

class CommunityException(message: String) : Exception(message)
