package com.smartfarm.web.ui.theme

import androidx.compose.runtime.Composable
import org.jetbrains.compose.web.dom.*

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    Style {
        unsafeCSS("""
            :root {
                --primary-color: #2E7D32;
                --secondary-color: #4CAF50;
                --accent-color: #8BC34A;
                --background-color: #F5F5F5;
                --surface-color: #FFFFFF;
                --text-primary: #212121;
                --text-secondary: #757575;
                --error-color: #F44336;
                --success-color: #4CAF50;
                --warning-color: #FF9800;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: var(--background-color);
                color: var(--text-primary);
                line-height: 1.6;
            }
            
            .header {
                background-color: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .app-title {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            
            .nav-list {
                list-style: none;
                display: flex;
                gap: 2rem;
            }
            
            .nav-link {
                color: white;
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                transition: background-color 0.3s;
            }
            
            .nav-link:hover {
                background-color: var(--secondary-color);
            }
            
            .nav-item.active .nav-link {
                background-color: var(--secondary-color);
            }
            
            .dashboard {
                padding: 2rem;
            }
            
            .screen-title {
                font-size: 1.8rem;
                margin-bottom: 2rem;
                color: var(--primary-color);
            }
            
            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            .dashboard-card {
                background-color: var(--surface-color);
                border-radius: 8px;
                padding: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            .dashboard-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            }
            
            .dashboard-card h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .card-content p {
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
            }
            
            .action-btn {
                background-color: var(--secondary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                margin: 0.25rem;
                transition: background-color 0.3s;
            }
            
            .action-btn:hover {
                background-color: var(--accent-color);
            }
        """)
    }
    
    content()
}
