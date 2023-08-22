/*
 * @Descripttion: loading
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-29 11:21:56
 * @LastEditors: lai_hq@126.com
 * @LastEditTime: 2023-04-02 19:00:50
 */
const LoadingTemp = document.createElement("template")

LoadingTemp.innerHTML = `
	<style>
		@keyframes antRotate {
			to {
				transform: rotate(405deg);
			}
		}
		@keyframes antSpinMove {
			to {
				opacity: 1;
			}
		}

		.loading {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 4;
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.03);
		}

		.loading-dot {
			position: absolute;
			top: 40%;
			left: 50%;
			margin: -5px;
			transform: rotate(45deg);
			animation: antRotate 1.2s infinite linear;
		}

		.loading-dot-item {
			position: absolute;
			display: block;
			width: 10px;
			height: 10px;
			background-color: #00b781;
			border-radius: 100%;
			transform: scale(0.75);
			transform-origin: 50% 50%;
			opacity: 0.3;
			animation: antSpinMove 1s infinite linear alternate;
		}

		.loading-dot-item:nth-child(1) {
			top: 0;
			left: 0;
		}

		.loading-dot-item:nth-child(2) {
			top: 0;
			right: 0;
			animation-delay: 0.4s;
		}

		.loading-dot-item:nth-child(3) {
			right: 0;
			bottom: 0;
			animation-delay: 0.8s;
		}

		.loading-dot-item:nth-child(4) {
			bottom: 0;
			left: 0;
			animation-delay: 1.2s;
		}

		.loading-text {
			position: absolute;
			top: 40%;
			display: block;
			padding-top: 25px;
			width: 100%;
			font-size: 14px;
			text-align: center;
			color: #00b781;
			text-shadow: 0 1px 2px #fff;
		}
	</style>
	<div class="loading">
        <span class="loading-dot">
            <i class="loading-dot-item"></i>
            <i class="loading-dot-item"></i>
            <i class="loading-dot-item"></i>
            <i class="loading-dot-item"></i>
        </span>
        <div class="loading-text">Loading...</div>
    </div>
`
class Loading extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: "open" })
        const content = LoadingTemp.content.cloneNode(true)

        this._shadowRoot.appendChild(content)
    }
    // 需要监听的属性
    static get observedAttributes() {
        return ["spinning", "tip"]
    }
    // 属性改变时触发，首次也会触发在connectedCallback之前
    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal
        this.render()
    }
    // 首次被插入到文档触发
    connectedCallback() {
        this.render()
    }
    render() {
        this._shadowRoot.querySelector(".loading-text").innerHTML = this.getAttribute("tip")
        const spinning = this.getAttribute("spinning") === "show" ? "block" : "none"
        this._shadowRoot.querySelector(".loading").setAttribute("style", `display:${spinning}`)
    }
}

window.customElements.define("loading-card", Loading)
