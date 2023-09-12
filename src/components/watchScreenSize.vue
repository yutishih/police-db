
<script>
    import { ref, onMounted, onUnmounted, provide } from 'vue';

    export default {
    name: 'watchScreenSize',
        setup() {
            const screenWidth = ref(window.innerWidth);
            const screenHeight = ref(window.innerHeight);

            const updateScreenSize = () => {
                screenWidth.value = window.innerWidth;
                screenHeight.value = window.innerHeight;
            };

            onMounted(() => {
                window.addEventListener('resize', updateScreenSize);
            });

            onUnmounted(() => {
                window.removeEventListener('resize', updateScreenSize);
            });

            alert(screenWidth)
            provide('screenSize', { screenWidth, screenHeight });

            return {};
        },
    };

</script>