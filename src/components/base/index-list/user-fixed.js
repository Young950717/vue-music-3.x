import { ref, watch, nextTick } from 'vue';
export default function useFixed(props) {
    const groupRef = ref(null);
    const listHeights = ref([]);
    const scrollY = ref(0);
    watch(() => props.data, async () => {
        await nextTick();
        calculate();
    });
    function calculate() {
        const list = groupRef.value.children;
        let height = 0;
        const listHeightVal = listHeights.value;
        listHeightVal.length = 0;
        listHeightVal.push(height);
        for (let i = 0; i < list.length; i++) {
            height += list[i].cilentHeight;
            listHeightVal.push(height);
        }
    }
    function onScroll(pos) {
        scrollY.value = -pos.y;
    }
    return {
        groupRef,
        onScroll
    };
}
