import { Spinner } from "react-bootstrap"

export default function Loading({ size = 25 }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <Spinner
                style={{
                    width: size,
                    height: size,
                }}
                animation="border"
            />
        </div>
    )
}