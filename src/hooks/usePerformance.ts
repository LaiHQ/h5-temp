import { onLCP, onFID, onCLS } from "web-vitals"

import { log } from "@/utils"

function compare(text: string, targetList: number[][], performance: any) {
    const target = performance.value
    const arr = targetList.map((value: number[], index: number) => {
        const t = [
            {
                label: "快",
                color: "green"
            },
            {
                label: "中等",
                color: "orange"
            },
            {
                label: "慢",
                color: "#f1404b"
            }
        ]
        return {
            value,
            ...t[index]
        }
    })
    const obj: any =
        arr.find((item: any) => {
            const [min, max] = item.value
            return max ? target < max : target > min
        }) || {}

    const formTarget = (v: number) => {
        if (v <= 1000) {
            return v.toFixed(0) + "ms"
        } else {
            return (v / 1000).toFixed(2) + "s"
        }
    }
    log({
        label: `${text}(${performance.name})`,
        value: `${obj.label} - ${formTarget(target)}`,
        valueColor: `${obj.color}`
    })
}

const usePerformance = () => {
    onCLS((e: { value: number }) => {
        compare("视觉稳定性", [[0, 0.1], [0.2, 0.25], [0.26]], e)
    })
    onFID((e: { value: number }) => {
        compare("交互性能", [[0, 300], [301, 600], [601]], e)
    })
    onLCP((e: { value: number }) => {
        compare("加载性能", [[0, 2500], [2501, 4000], [4001]], e)
    })
}

export default usePerformance
