// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "IntrinsicDesign",
    platforms: [
        .iOS(.v17),
        .macOS(.v14),
        .watchOS(.v10),
        .tvOS(.v17),
    ],
    products: [
        .library(name: "IntrinsicDesign", targets: ["IntrinsicDesign"]),
    ],
    targets: [
        .target(
            name: "IntrinsicDesign",
            path: "Sources/IntrinsicDesign"
        ),
    ]
)
