import UIKit
import Compose
import ComposeApp

class MainViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
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
