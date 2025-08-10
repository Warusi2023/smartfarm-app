package com.example.smartfarm.web.ui.localization

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*

object Localization {
    private val _currentLanguage = mutableStateOf("en")
    val currentLanguage: State<String> = _currentLanguage
    
    fun setLanguage(language: String) {
        _currentLanguage.value = language
    }
    
    fun getText(key: String): String {
        return translations[currentLanguage.value]?.get(key) ?: translations["en"]?.get(key) ?: key
    }
    
    fun getText(key: String, vararg args: String): String {
        val text = getText(key)
        return args.foldIndexed(text) { index, acc, arg ->
            acc.replace("{${index}}", arg)
        }
    }
}

@Composable
fun LanguageSelector() {
    var showLanguageMenu by remember { mutableStateOf(false) }
    
    Div({
        style {
            position(Position.Relative)
        }
    }) {
        Button({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(8.px)
                padding(8.px, 16.px)
                border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                borderRadius(8.px)
                backgroundColor(Color.white)
                color(Color("#2C3E50"))
                fontSize(14.px)
                cursor("pointer")
            }
            onClick { showLanguageMenu = !showLanguageMenu }
        }) {
            Span({
                style {
                    fontSize(16.px)
                }
            }) {
                Text(getLanguageFlag(Localization.currentLanguage.value))
            }
            Text(getLanguageName(Localization.currentLanguage.value))
            Span({
                style {
                    fontSize(12.px)
                }
            }) {
                Text(if (showLanguageMenu) "▲" else "▼")
            }
        }
        
        if (showLanguageMenu) {
            LanguageMenu(
                onLanguageSelect = { language ->
                    Localization.setLanguage(language)
                    showLanguageMenu = false
                }
            )
        }
    }
}

@Composable
private fun LanguageMenu(onLanguageSelect: (String) -> Unit) {
    Div({
        style {
            position(Position.Absolute)
            top(100.percent)
            right(0.px)
            backgroundColor(Color.white)
            border(1.px, LineStyle.Solid, Color("#E0E0E0"))
            borderRadius(8.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
            zIndex(1000)
            minWidth(150.px)
        }
    }) {
        availableLanguages.forEach { (code, name, flag) ->
            Button({
                style {
                    display(DisplayStyle.Flex)
                    alignItems(Align.Center)
                    gap(8.px)
                    width(100.percent)
                    padding(12.px, 16.px)
                    border(none)
                    backgroundColor(Color.transparent)
                    color(Color("#2C3E50"))
                    fontSize(14.px)
                    cursor("pointer")
                    textAlign(TextAlign.Start)
                }
                onClick { onLanguageSelect(code) }
            }) {
                Span({
                    style {
                        fontSize(16.px)
                    }
                }) {
                    Text(flag)
                }
                Text(name)
            }
        }
    }
}

private fun getLanguageFlag(language: String): String {
    return when (language) {
        "en" -> "🇺🇸"
        "es" -> "🇪🇸"
        "fr" -> "🇫🇷"
        "de" -> "🇩🇪"
        "pt" -> "🇧🇷"
        "zh" -> "🇨🇳"
        "ja" -> "🇯🇵"
        "ko" -> "🇰🇷"
        "ar" -> "🇸🇦"
        "hi" -> "🇮🇳"
        else -> "🌐"
    }
}

private fun getLanguageName(language: String): String {
    return when (language) {
        "en" -> "English"
        "es" -> "Español"
        "fr" -> "Français"
        "de" -> "Deutsch"
        "pt" -> "Português"
        "zh" -> "中文"
        "ja" -> "日本語"
        "ko" -> "한국어"
        "ar" -> "العربية"
        "hi" -> "हिन्दी"
        else -> "English"
    }
}

private val availableLanguages = listOf(
    "en" to "English" to "🇺🇸",
    "es" to "Español" to "🇪🇸",
    "fr" to "Français" to "🇫🇷",
    "de" to "Deutsch" to "🇩🇪",
    "pt" to "Português" to "🇧🇷",
    "zh" to "中文" to "🇨🇳",
    "ja" to "日本語" to "🇯🇵",
    "ko" to "한국어" to "🇰🇷",
    "ar" to "العربية" to "🇸🇦",
    "hi" to "हिन्दी" to "🇮🇳"
)

private val translations = mapOf(
    "en" to mapOf(
        // Navigation
        "nav.home" to "Home",
        "nav.livestock" to "Livestock",
        "nav.crops" to "Crops",
        "nav.weather" to "Weather",
        "nav.inventory" to "Inventory",
        "nav.employees" to "Employees",
        "nav.market_prices" to "Market Prices",
        "nav.documents" to "Documents",
        "nav.financial" to "Financial",
        "nav.tasks" to "Tasks",
        "nav.reports" to "Reports",
        "nav.analytics" to "Analytics",
        "nav.expert_chat" to "Expert Chat",
        "nav.settings" to "Settings",
        
        // Common Actions
        "action.add" to "Add",
        "action.edit" to "Edit",
        "action.delete" to "Delete",
        "action.save" to "Save",
        "action.cancel" to "Cancel",
        "action.download" to "Download",
        "action.upload" to "Upload",
        "action.search" to "Search",
        "action.filter" to "Filter",
        "action.export" to "Export",
        "action.import" to "Import",
        
        // Status
        "status.active" to "Active",
        "status.inactive" to "Inactive",
        "status.pending" to "Pending",
        "status.completed" to "Completed",
        "status.cancelled" to "Cancelled",
        
        // Messages
        "message.success" to "Operation completed successfully",
        "message.error" to "An error occurred",
        "message.confirm_delete" to "Are you sure you want to delete this item?",
        "message.loading" to "Loading...",
        "message.no_data" to "No data available",
        
        // Form Labels
        "form.name" to "Name",
        "form.email" to "Email",
        "form.phone" to "Phone",
        "form.description" to "Description",
        "form.category" to "Category",
        "form.quantity" to "Quantity",
        "form.price" to "Price",
        "form.date" to "Date",
        "form.status" to "Status",
        
        // Livestock
        "livestock.title" to "Livestock Management",
        "livestock.add_animal" to "Add Animal",
        "livestock.animal_id" to "Animal ID",
        "livestock.breed" to "Breed",
        "livestock.weight" to "Weight",
        "livestock.health_status" to "Health Status",
        "livestock.vaccination_date" to "Vaccination Date",
        
        // Crops
        "crops.title" to "Crop Management",
        "crops.add_crop" to "Add Crop",
        "crops.crop_type" to "Crop Type",
        "crops.planting_date" to "Planting Date",
        "crops.harvest_date" to "Harvest Date",
        "crops.field_location" to "Field Location",
        "crops.yield" to "Yield",
        
        // Inventory
        "inventory.title" to "Inventory Management",
        "inventory.add_item" to "Add Item",
        "inventory.item_name" to "Item Name",
        "inventory.location" to "Location",
        "inventory.supplier" to "Supplier",
        "inventory.reorder_point" to "Reorder Point",
        "inventory.low_stock" to "Low Stock",
        "inventory.in_stock" to "In Stock",
        
        // Employees
        "employees.title" to "Employee Management",
        "employees.add_employee" to "Add Employee",
        "employees.role" to "Role",
        "employees.department" to "Department",
        "employees.hire_date" to "Hire Date",
        "employees.salary" to "Salary",
        "employees.schedule" to "Schedule",
        
        // Market Prices
        "market_prices.title" to "Market Price Tracking",
        "market_prices.current_price" to "Current Price",
        "market_prices.price_change" to "Price Change",
        "market_prices.volume" to "Volume",
        "market_prices.trend" to "Trend",
        "market_prices.price_alerts" to "Price Alerts",
        "market_prices.predictions" to "AI Predictions",
        
        // Documents
        "documents.title" to "Document Management",
        "documents.upload" to "Upload Document",
        "documents.file_type" to "File Type",
        "documents.file_size" to "File Size",
        "documents.upload_date" to "Upload Date",
        "documents.important" to "Important",
        "documents.share" to "Share",
        
        // Financial
        "financial.title" to "Financial Management",
        "financial.income" to "Income",
        "financial.expenses" to "Expenses",
        "financial.profit" to "Profit",
        "financial.revenue" to "Revenue",
        "financial.cash_flow" to "Cash Flow",
        "financial.budget" to "Budget",
        
        // Tasks
        "tasks.title" to "Task Management",
        "tasks.add_task" to "Add Task",
        "tasks.priority" to "Priority",
        "tasks.due_date" to "Due Date",
        "tasks.assigned_to" to "Assigned To",
        "tasks.completed" to "Completed",
        "tasks.in_progress" to "In Progress",
        
        // Weather
        "weather.title" to "Weather Information",
        "weather.current" to "Current Weather",
        "weather.forecast" to "Forecast",
        "weather.temperature" to "Temperature",
        "weather.humidity" to "Humidity",
        "weather.wind_speed" to "Wind Speed",
        "weather.precipitation" to "Precipitation",
        
        // Analytics
        "analytics.title" to "Analytics Dashboard",
        "analytics.performance" to "Performance",
        "analytics.trends" to "Trends",
        "analytics.reports" to "Reports",
        "analytics.insights" to "Insights",
        "analytics.metrics" to "Metrics",
        
        // Settings
        "settings.title" to "Settings",
        "settings.profile" to "Profile",
        "settings.notifications" to "Notifications",
        "settings.security" to "Security",
        "settings.language" to "Language",
        "settings.theme" to "Theme",
        "settings.backup" to "Backup & Restore"
    ),
    
    "es" to mapOf(
        "nav.home" to "Inicio",
        "nav.livestock" to "Ganado",
        "nav.crops" to "Cultivos",
        "nav.weather" to "Clima",
        "nav.inventory" to "Inventario",
        "nav.employees" to "Empleados",
        "nav.market_prices" to "Precios del Mercado",
        "nav.documents" to "Documentos",
        "nav.financial" to "Financiero",
        "nav.tasks" to "Tareas",
        "nav.reports" to "Reportes",
        "nav.analytics" to "Análisis",
        "nav.expert_chat" to "Chat Experto",
        "nav.settings" to "Configuración",
        
        "action.add" to "Agregar",
        "action.edit" to "Editar",
        "action.delete" to "Eliminar",
        "action.save" to "Guardar",
        "action.cancel" to "Cancelar",
        "action.download" to "Descargar",
        "action.upload" to "Subir",
        "action.search" to "Buscar",
        "action.filter" to "Filtrar",
        "action.export" to "Exportar",
        "action.import" to "Importar",
        
        "status.active" to "Activo",
        "status.inactive" to "Inactivo",
        "status.pending" to "Pendiente",
        "status.completed" to "Completado",
        "status.cancelled" to "Cancelado",
        
        "message.success" to "Operación completada exitosamente",
        "message.error" to "Ocurrió un error",
        "message.confirm_delete" to "¿Está seguro de que desea eliminar este elemento?",
        "message.loading" to "Cargando...",
        "message.no_data" to "No hay datos disponibles"
    ),
    
    "fr" to mapOf(
        "nav.home" to "Accueil",
        "nav.livestock" to "Bétail",
        "nav.crops" to "Cultures",
        "nav.weather" to "Météo",
        "nav.inventory" to "Inventaire",
        "nav.employees" to "Employés",
        "nav.market_prices" to "Prix du Marché",
        "nav.documents" to "Documents",
        "nav.financial" to "Financier",
        "nav.tasks" to "Tâches",
        "nav.reports" to "Rapports",
        "nav.analytics" to "Analyses",
        "nav.expert_chat" to "Chat Expert",
        "nav.settings" to "Paramètres",
        
        "action.add" to "Ajouter",
        "action.edit" to "Modifier",
        "action.delete" to "Supprimer",
        "action.save" to "Enregistrer",
        "action.cancel" to "Annuler",
        "action.download" to "Télécharger",
        "action.upload" to "Téléverser",
        "action.search" to "Rechercher",
        "action.filter" to "Filtrer",
        "action.export" to "Exporter",
        "action.import" to "Importer",
        
        "status.active" to "Actif",
        "status.inactive" to "Inactif",
        "status.pending" to "En attente",
        "status.completed" to "Terminé",
        "status.cancelled" to "Annulé",
        
        "message.success" to "Opération terminée avec succès",
        "message.error" to "Une erreur s'est produite",
        "message.confirm_delete" to "Êtes-vous sûr de vouloir supprimer cet élément ?",
        "message.loading" to "Chargement...",
        "message.no_data" to "Aucune donnée disponible"
    ),
    
    "de" to mapOf(
        "nav.home" to "Startseite",
        "nav.livestock" to "Vieh",
        "nav.crops" to "Kulturen",
        "nav.weather" to "Wetter",
        "nav.inventory" to "Inventar",
        "nav.employees" to "Mitarbeiter",
        "nav.market_prices" to "Marktpreise",
        "nav.documents" to "Dokumente",
        "nav.financial" to "Finanzen",
        "nav.tasks" to "Aufgaben",
        "nav.reports" to "Berichte",
        "nav.analytics" to "Analysen",
        "nav.expert_chat" to "Experten-Chat",
        "nav.settings" to "Einstellungen",
        
        "action.add" to "Hinzufügen",
        "action.edit" to "Bearbeiten",
        "action.delete" to "Löschen",
        "action.save" to "Speichern",
        "action.cancel" to "Abbrechen",
        "action.download" to "Herunterladen",
        "action.upload" to "Hochladen",
        "action.search" to "Suchen",
        "action.filter" to "Filtern",
        "action.export" to "Exportieren",
        "action.import" to "Importieren",
        
        "status.active" to "Aktiv",
        "status.inactive" to "Inaktiv",
        "status.pending" to "Ausstehend",
        "status.completed" to "Abgeschlossen",
        "status.cancelled" to "Abgebrochen",
        
        "message.success" to "Vorgang erfolgreich abgeschlossen",
        "message.error" to "Ein Fehler ist aufgetreten",
        "message.confirm_delete" to "Sind Sie sicher, dass Sie dieses Element löschen möchten?",
        "message.loading" to "Laden...",
        "message.no_data" to "Keine Daten verfügbar"
    ),
    
    "pt" to mapOf(
        "nav.home" to "Início",
        "nav.livestock" to "Gado",
        "nav.crops" to "Culturas",
        "nav.weather" to "Clima",
        "nav.inventory" to "Inventário",
        "nav.employees" to "Funcionários",
        "nav.market_prices" to "Preços do Mercado",
        "nav.documents" to "Documentos",
        "nav.financial" to "Financeiro",
        "nav.tasks" to "Tarefas",
        "nav.reports" to "Relatórios",
        "nav.analytics" to "Análises",
        "nav.expert_chat" to "Chat Especialista",
        "nav.settings" to "Configurações",
        
        "action.add" to "Adicionar",
        "action.edit" to "Editar",
        "action.delete" to "Excluir",
        "action.save" to "Salvar",
        "action.cancel" to "Cancelar",
        "action.download" to "Baixar",
        "action.upload" to "Enviar",
        "action.search" to "Pesquisar",
        "action.filter" to "Filtrar",
        "action.export" to "Exportar",
        "action.import" to "Importar",
        
        "status.active" to "Ativo",
        "status.inactive" to "Inativo",
        "status.pending" to "Pendente",
        "status.completed" to "Concluído",
        "status.cancelled" to "Cancelado",
        
        "message.success" to "Operação concluída com sucesso",
        "message.error" to "Ocorreu um erro",
        "message.confirm_delete" to "Tem certeza de que deseja excluir este item?",
        "message.loading" to "Carregando...",
        "message.no_data" to "Nenhum dado disponível"
    ),
    
    "zh" to mapOf(
        "nav.home" to "首页",
        "nav.livestock" to "牲畜",
        "nav.crops" to "作物",
        "nav.weather" to "天气",
        "nav.inventory" to "库存",
        "nav.employees" to "员工",
        "nav.market_prices" to "市场价格",
        "nav.documents" to "文档",
        "nav.financial" to "财务",
        "nav.tasks" to "任务",
        "nav.reports" to "报告",
        "nav.analytics" to "分析",
        "nav.expert_chat" to "专家聊天",
        "nav.settings" to "设置",
        
        "action.add" to "添加",
        "action.edit" to "编辑",
        "action.delete" to "删除",
        "action.save" to "保存",
        "action.cancel" to "取消",
        "action.download" to "下载",
        "action.upload" to "上传",
        "action.search" to "搜索",
        "action.filter" to "筛选",
        "action.export" to "导出",
        "action.import" to "导入",
        
        "status.active" to "活跃",
        "status.inactive" to "非活跃",
        "status.pending" to "待处理",
        "status.completed" to "已完成",
        "status.cancelled" to "已取消",
        
        "message.success" to "操作成功完成",
        "message.error" to "发生错误",
        "message.confirm_delete" to "确定要删除此项目吗？",
        "message.loading" to "加载中...",
        "message.no_data" to "暂无数据"
    ),
    
    "ja" to mapOf(
        "nav.home" to "ホーム",
        "nav.livestock" to "家畜",
        "nav.crops" to "作物",
        "nav.weather" to "天気",
        "nav.inventory" to "在庫",
        "nav.employees" to "従業員",
        "nav.market_prices" to "市場価格",
        "nav.documents" to "文書",
        "nav.financial" to "財務",
        "nav.tasks" to "タスク",
        "nav.reports" to "レポート",
        "nav.analytics" to "分析",
        "nav.expert_chat" to "エキスパートチャット",
        "nav.settings" to "設定",
        
        "action.add" to "追加",
        "action.edit" to "編集",
        "action.delete" to "削除",
        "action.save" to "保存",
        "action.cancel" to "キャンセル",
        "action.download" to "ダウンロード",
        "action.upload" to "アップロード",
        "action.search" to "検索",
        "action.filter" to "フィルター",
        "action.export" to "エクスポート",
        "action.import" to "インポート",
        
        "status.active" to "アクティブ",
        "status.inactive" to "非アクティブ",
        "status.pending" to "保留中",
        "status.completed" to "完了",
        "status.cancelled" to "キャンセル",
        
        "message.success" to "操作が正常に完了しました",
        "message.error" to "エラーが発生しました",
        "message.confirm_delete" to "このアイテムを削除してもよろしいですか？",
        "message.loading" to "読み込み中...",
        "message.no_data" to "データがありません"
    ),
    
    "ko" to mapOf(
        "nav.home" to "홈",
        "nav.livestock" to "가축",
        "nav.crops" to "작물",
        "nav.weather" to "날씨",
        "nav.inventory" to "재고",
        "nav.employees" to "직원",
        "nav.market_prices" to "시장 가격",
        "nav.documents" to "문서",
        "nav.financial" to "재무",
        "nav.tasks" to "작업",
        "nav.reports" to "보고서",
        "nav.analytics" to "분석",
        "nav.expert_chat" to "전문가 채팅",
        "nav.settings" to "설정",
        
        "action.add" to "추가",
        "action.edit" to "편집",
        "action.delete" to "삭제",
        "action.save" to "저장",
        "action.cancel" to "취소",
        "action.download" to "다운로드",
        "action.upload" to "업로드",
        "action.search" to "검색",
        "action.filter" to "필터",
        "action.export" to "내보내기",
        "action.import" to "가져오기",
        
        "status.active" to "활성",
        "status.inactive" to "비활성",
        "status.pending" to "대기 중",
        "status.completed" to "완료",
        "status.cancelled" to "취소됨",
        
        "message.success" to "작업이 성공적으로 완료되었습니다",
        "message.error" to "오류가 발생했습니다",
        "message.confirm_delete" to "이 항목을 삭제하시겠습니까?",
        "message.loading" to "로딩 중...",
        "message.no_data" to "데이터가 없습니다"
    ),
    
    "ar" to mapOf(
        "nav.home" to "الرئيسية",
        "nav.livestock" to "الماشية",
        "nav.crops" to "المحاصيل",
        "nav.weather" to "الطقس",
        "nav.inventory" to "المخزون",
        "nav.employees" to "الموظفين",
        "nav.market_prices" to "أسعار السوق",
        "nav.documents" to "المستندات",
        "nav.financial" to "المالية",
        "nav.tasks" to "المهام",
        "nav.reports" to "التقارير",
        "nav.analytics" to "التحليلات",
        "nav.expert_chat" to "الدردشة مع الخبراء",
        "nav.settings" to "الإعدادات",
        
        "action.add" to "إضافة",
        "action.edit" to "تعديل",
        "action.delete" to "حذف",
        "action.save" to "حفظ",
        "action.cancel" to "إلغاء",
        "action.download" to "تحميل",
        "action.upload" to "رفع",
        "action.search" to "بحث",
        "action.filter" to "تصفية",
        "action.export" to "تصدير",
        "action.import" to "استيراد",
        
        "status.active" to "نشط",
        "status.inactive" to "غير نشط",
        "status.pending" to "في الانتظار",
        "status.completed" to "مكتمل",
        "status.cancelled" to "ملغي",
        
        "message.success" to "تم إكمال العملية بنجاح",
        "message.error" to "حدث خطأ",
        "message.confirm_delete" to "هل أنت متأكد من حذف هذا العنصر؟",
        "message.loading" to "جاري التحميل...",
        "message.no_data" to "لا توجد بيانات متاحة"
    ),
    
    "hi" to mapOf(
        "nav.home" to "होम",
        "nav.livestock" to "पशुधन",
        "nav.crops" to "फसलें",
        "nav.weather" to "मौसम",
        "nav.inventory" to "इन्वेंटरी",
        "nav.employees" to "कर्मचारी",
        "nav.market_prices" to "बाजार मूल्य",
        "nav.documents" to "दस्तावेज",
        "nav.financial" to "वित्तीय",
        "nav.tasks" to "कार्य",
        "nav.reports" to "रिपोर्ट",
        "nav.analytics" to "विश्लेषण",
        "nav.expert_chat" to "विशेषज्ञ चैट",
        "nav.settings" to "सेटिंग्स",
        
        "action.add" to "जोड़ें",
        "action.edit" to "संपादित करें",
        "action.delete" to "हटाएं",
        "action.save" to "सहेजें",
        "action.cancel" to "रद्द करें",
        "action.download" to "डाउनलोड",
        "action.upload" to "अपलोड",
        "action.search" to "खोजें",
        "action.filter" to "फ़िल्टर",
        "action.export" to "निर्यात",
        "action.import" to "आयात",
        
        "status.active" to "सक्रिय",
        "status.inactive" to "निष्क्रिय",
        "status.pending" to "लंबित",
        "status.completed" to "पूर्ण",
        "status.cancelled" to "रद्द",
        
        "message.success" to "कार्य सफलतापूर्वक पूरा हुआ",
        "message.error" to "एक त्रुटि हुई",
        "message.confirm_delete" to "क्या आप वाकई इस आइटम को हटाना चाहते हैं?",
        "message.loading" to "लोड हो रहा है...",
        "message.no_data" to "कोई डेटा उपलब्ध नहीं है"
    )
)

// Extension function for easy text access
fun String.localized(): String = Localization.getText(this)
fun String.localized(vararg args: String): String = Localization.getText(this, *args) 