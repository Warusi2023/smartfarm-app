# 👥 SmartFarm User Management & Approval System

## 🎯 **Quick Solutions for Your Questions**

### **Q: How do I approve tasks if there's only a single user?**

**A: You have several options:**

1. **Make yourself an Admin** (Recommended)
   - Go to User Management → Change Role → Set to "Admin"
   - Admins can approve all tasks automatically

2. **Create Additional Users**
   - Go to User Management → Create User → Set role to "Manager" or "Admin"
   - Assign them to your farms

3. **Self-Approval Mode** (Temporary)
   - For single-user farms, tasks can be auto-approved
   - Contact support to enable this feature

### **Q: How do I add people to my group on various stages (premium and other users)?**

**A: Complete User Management System:**

## 🏗️ **User Management System Overview**

### **User Roles & Permissions**

| Role | Permissions | Can Approve Tasks | Farm Access |
|------|-------------|-------------------|-------------|
| **Admin** | Full system access | ✅ All tasks | All farms |
| **Manager** | Farm management | ✅ Farm tasks | Assigned farms |
| **Farmer** | Basic operations | ❌ No approval | Own farms only |

### **Premium Tiers** (Coming Soon)

| Tier | Features | User Limit | Price |
|------|----------|------------|-------|
| **Basic** | 1 user, 1 farm | 1 user | Free |
| **Professional** | 5 users, 3 farms | 5 users | $29/month |
| **Enterprise** | Unlimited users | Unlimited | $99/month |

## 🚀 **How to Use the System**

### **Step 1: Access User Management**

1. **Login to SmartFarm**
2. **Go to Dashboard** → Click "User Management" button
3. **Or visit**: `https://your-smartfarm-url.com/user-management.html`

### **Step 2: Create Additional Users**

```bash
# Admin can create users via:
1. User Management → Create User
2. Fill in: Name, Email, Password, Role
3. Assign to farms
4. Set permissions
```

### **Step 3: Assign Users to Farms**

```bash
# Assign users to farm groups:
1. Select user → Assign to Farm
2. Choose farm from dropdown
3. Set role (Manager/Farmer)
4. User gets access to that farm
```

### **Step 4: Handle Task Approvals**

```bash
# For task approvals:
1. Go to User Management → Approve Tasks
2. View pending tasks
3. Approve/Reject with notes
4. Tasks execute automatically
```

## 🔧 **API Endpoints for User Management**

### **Authentication**
```bash
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile
```

### **User Management**
```bash
GET    /api/user-management/users              # List all users (Admin)
POST   /api/user-management/users              # Create user (Admin)
PUT    /api/user-management/users/:id/role     # Update role (Admin)
POST   /api/user-management/users/:id/assign-farm # Assign to farm
GET    /api/user-management/my-farms          # Get user's farms
PUT    /api/user-management/profile            # Update profile
PUT    /api/user-management/change-password     # Change password
```

### **Task Approvals**
```bash
POST   /api/user-management/tasks/:id/approve  # Approve/reject task
GET    /api/user-management/farms/:id/members   # Get farm members
```

## 📱 **Frontend Integration**

### **Add User Management to Dashboard**

Add this button to your dashboard:

```html
<!-- Add to dashboard.html -->
<button class="btn btn-primary" onclick="window.location.href='user-management.html'">
    <i class="fas fa-users-cog me-1"></i>User Management
</button>
```

### **Include User Management Script**

```html
<!-- Add to dashboard.html -->
<script src="js/user-management.js"></script>
```

## 🎯 **Specific Solutions**

### **Solution 1: Make Yourself Admin**

```javascript
// Run this in browser console (temporary):
fetch('/api/user-management/users/YOUR_USER_ID/role', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    },
    body: JSON.stringify({
        role: 'admin',
        permissions: ['approve_tasks', 'manage_users', 'manage_farms']
    })
});
```

### **Solution 2: Create Additional Users**

```javascript
// Create a manager user:
fetch('/api/user-management/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    },
    body: JSON.stringify({
        email: 'manager@yourfarm.com',
        password: 'SecurePassword123!',
        firstName: 'Farm',
        lastName: 'Manager',
        role: 'manager',
        permissions: ['approve_tasks', 'manage_farm']
    })
});
```

### **Solution 3: Auto-Approve for Single User**

```javascript
// Modify task approval logic (temporary):
if (farmMembers.length === 1 && farmMembers[0].role === 'owner') {
    // Auto-approve for single owner
    return { approved: true, autoApproved: true };
}
```

## 🔐 **Security Features**

### **Role-Based Access Control**
- ✅ Admin: Full system access
- ✅ Manager: Farm-level access
- ✅ Farmer: Own data only

### **Permission System**
- ✅ Granular permissions
- ✅ Farm-specific access
- ✅ Task approval rights

### **Audit Logging**
- ✅ All user actions logged
- ✅ Role changes tracked
- ✅ Task approvals recorded

## 📊 **Monitoring & Analytics**

### **User Activity**
- Login/logout tracking
- Action logging
- Permission usage

### **Farm Management**
- Member assignments
- Role distributions
- Access patterns

## 🚀 **Deployment Status**

✅ **Backend**: User management API ready  
✅ **Frontend**: User management interface ready  
✅ **Authentication**: Role-based access control  
✅ **Database**: User roles and permissions  
✅ **Security**: Input validation and sanitization  

## 🎯 **Next Steps**

1. **Deploy the updated system** (already in progress)
2. **Access User Management** via dashboard
3. **Create additional users** as needed
4. **Assign users to farms** for group management
5. **Handle task approvals** through the interface

## 📞 **Support**

If you need help with user management:

1. **Check the deployment status**: `node scripts/deploy-automation.js check`
2. **Access user management**: Go to dashboard → User Management
3. **Create admin user**: Use the API endpoints above
4. **Contact support**: Check GitHub issues or documentation

---

**🎉 Your SmartFarm system now has complete user management and approval capabilities!**

The system is designed to scale from single-user farms to large agricultural enterprises with multiple team members and complex approval workflows.
