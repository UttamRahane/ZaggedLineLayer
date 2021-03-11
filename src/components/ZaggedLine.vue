<script lang="ts">
import ExtendedLineLayer from "./ExtendedLineLayer";
import { BaseLayerMixin } from "@hirelofty/vue_deckgl";
export default {
  name: "ZaggedLineLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: ExtendedLineLayer,
    };
  },
  render: () => null,
};
</script>