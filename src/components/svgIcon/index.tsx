import { defineComponent } from "vue"

export default defineComponent({
    name: "SvgIcon",
    props: {
        name: String,
        prefix: {
            type: String,
            default: "icon"
        },
        color: {
            type: String,
            default: "#333"
        },
        width: String,
        height: String
    },
    setup(props) {
        return () => {
            const symbolId = `#${props.prefix}-${props.name}`
            const style = {
                width: props.width + "px",
                height: props.width + "px"
            }
            return (
                <svg style={style} aria-hidden="true" fill={props.color}>
                    <use href={symbolId} fill={props.color} />
                </svg>
            )
        }
    }
})
