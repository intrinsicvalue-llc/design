//
// IntrinsicFoundation.generated.swift
// GENERATED — intrinsicvalue-llc/design — do not edit.
// Source: tokens/foundation.json
// Regenerate: npm run build (design repo root)
//


import SwiftUI

/// Company-wide spacing scale (4pt grid). Source: tokens/foundation.json
public enum IntrinsicSpacing {
    public static let xxs: CGFloat = 4
    public static let xs: CGFloat = 8
    public static let sm: CGFloat = 12
    public static let md: CGFloat = 16
    public static let lg: CGFloat = 20
    public static let xl: CGFloat = 24
    public static let section: CGFloat = 32
}

/// Corner radii for repeated product surfaces.
public enum IntrinsicRadius {
    public static let badge: CGFloat = 10
    public static let button: CGFloat = 14
    public static let card: CGFloat = 20
}

/// Semantic status colors — prefer system roles on Apple platforms.
public enum IntrinsicColorRole {
    public static let info: Color = .blue
    public static let warning: Color = .orange
    public static let success: Color = .green
    public static let critical: Color = .red
    public static let neutralSecondary: Color = .secondary
}

/// Semantic ControlSize aliases (SwiftUI-native; not pixel tokens).
public enum IntrinsicControlSize {
    /// Default in-content control (maps to `.regular`).
    public static let standard: ControlSize = .regular
    /// Taller paired actions in dense cards (maps to `.large`).
    public static let heroActionPair: ControlSize = .large
    /// HIG minimum touch; square so `.glass` renders as a circle.
    public static let glassIconSquare: CGFloat = 44
}

/// Semantic typography roles — maps to Apple Text Styles (Dynamic Type on iOS).
/// Web/Android: same role names; web uses foundation CSS vars. See patterns/TYPOGRAPHY.md.
public enum IntrinsicTypography {
    public static let largeTitle: Font = .largeTitle /// Rare full-screen hero titles; prefer navigation title for most screens
    public static let title: Font = .title /// Primary screen title in content (when not using navigation bar title)
    public static let headline: Font = .headline /// List row primary text, card titles, emphasized inline labels
    public static let body: Font = .body /// Default reading text, descriptions, form values
    public static let callout: Font = .callout /// Secondary emphasis blocks, callout banners, short intros
    public static let subheadline: Font = .subheadline /// List row subtitles, supporting sentences under headlines
    public static let footnote: Font = .footnote /// Timestamps, legal hints, tertiary metadata, error fine print
    public static let caption: Font = .caption /// Image captions, badge text, compact list secondary lines
    public static let caption2: Font = .caption2 /// Smallest legible metadata; use sparingly
    public static let label: Font = .subheadline.weight(.medium) /// Section headers, form field labels, uppercase chrome — not body copy
}

public typealias TastefulTypography = IntrinsicTypography

// MARK: - Product back-compat typealiases
public typealias TastefulSpacing = IntrinsicSpacing
public typealias TastefulRadius = IntrinsicRadius
public typealias TastefulColorRole = IntrinsicColorRole
public typealias TastefulControlSize = IntrinsicControlSize
