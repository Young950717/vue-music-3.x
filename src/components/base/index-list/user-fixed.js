import { ref, watch, nextTick, computed } from 'vue'
export default function useFixed (props) {
    const TITLE_HEIGHT = 30
    const groupRef = ref(null)
    const listHeights = ref([])
    const scrollY = ref(0)
    const currentIdx = ref(0) // 记录当前滚动的到的index
    const distance = ref(0)

    const fixedTitle = computed(() => {
        if (scrollY.value < 0) return ''
        const currentGroup = props.data[currentIdx.value]
        return currentGroup ? currentGroup.title : ''
    })

    const fixedStyle = computed(() => {
        const distanceVal = distance.value
        const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
        return {
            transform: `translate3d(0,${diff}px,0)`
        }
    })

    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })
    watch(scrollY, newY => {
        const listHeight = listHeights.value
        for (let i = 0; i < listHeight.length - 1; i++) {
            const heightTop = listHeight[i]
            const heightBottom = listHeight[i + 1]
            if (newY >= heightTop && newY <= heightBottom) {
                // console.log(currentIdx.value)
                currentIdx.value = i
                distance.value = heightBottom - newY
            }
        }
    })
    function calculate () {
        const list = groupRef.value.children
        let height = 0
        const listHeightVal = listHeights.value
        listHeightVal.length = 0
        listHeightVal.push(height)
        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightVal.push(height)
        }
    }
    function onScroll (pos) {
        scrollY.value = -pos.y
    }
    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle,
        currentIdx
    }
}
