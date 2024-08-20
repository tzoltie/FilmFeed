export default function Shadow({ isEnabled }) {
    return isEnabled ? (
        <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 1}}
        />
    ) : null
}