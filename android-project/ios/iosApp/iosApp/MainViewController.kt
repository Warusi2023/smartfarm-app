import UIKit
import Compose
import shared

class MainViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Initialize shared KMM app (Koin, database, etc.)
        AppInitializer().initialize()
        
        let composeView = ComposeView()
        composeView.setContent {
            SmartFarmApp()
        }
        
        view.addSubview(composeView)
        composeView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            composeView.topAnchor.constraint(equalTo: view.topAnchor),
            composeView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            composeView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            composeView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}
