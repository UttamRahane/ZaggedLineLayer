<template>
  <div class="example">
    <DeckGL
      ref="deck"
      :class="['fill-wrapper']"
      :layers="layers"
      :width="'100%'"
      :height="'100%'"
      :canvas="'deck-canvas'"
      :controller="true"
      :useDevicePixels="true"
      :controlMap="true"
      :viewState="deckglSettings.viewState"
      @initialRender="
        () => {
          hasDeckLoaded = true;
        }
      "
    >
      <ZaggedLineLayer
        :id="'zagged-line'"
        :data="inputData"
        :pickable="true"
        :widthScale="20"
        :widthMinPixels="2"
        :getPath="(d) => d.path"
        :getColor="(d) => [255, 0, 0]"
        :getWidth="(d) => 5"
      />
      <MapView
        :id="'my-map-view-2'"
        :longitude="mapboxSettings.center[0]"
        :latitude="mapboxSettings.center[1]"
        :controller="true"
        :width="'100%'"
        :height="'100%'"
        :zoom="mapboxSettings.zoom"
      >
        <Mapbox
          :accessToken="mapboxToken"
          :map_style="mapboxSettings.style"
          :container="'mapbox-2'"
          :interactive="true"
          :center="mapboxSettings.center"
          :zoom="mapboxSettings.zoom"
          :bearing="mapboxSettings.bearing"
          :pitch="mapboxSettings.pitch"
        />
      </MapView>
      <MapView
        :id="'my-map-view-1'"
        :longitude="mapboxSettings.center[0]"
        :latitude="mapboxSettings.center[1]"
        :controller="true"
        :width="'20%'"
        :height="'20%'"
        :zoom="mapboxSettings.zoom"
      >
        <Mapbox
          :accessToken="mapboxToken"
          :map_style="mapboxSettings.style"
          :container="'mapbox-3'"
          :interactive="true"
          :center="mapboxSettings.center"
          :zoom="mapboxSettings.zoom"
          :bearing="mapboxSettings.bearing"
          :pitch="mapboxSettings.pitch"
        />
      </MapView>
    </DeckGL>
    <h1 v-if="!hasDeckLoaded">Loading...</h1>
  </div>
</template>

<script>
import { DeckGL, Mapbox, MapView } from "@hirelofty/vue_deckgl";
import ZaggedLineLayer from "./ZaggedLine.vue";
import {
  MAPBOX_SETTINGS,
  DECKGL_SETTINGS,
  MAPBOX_TOKEN,
} from "./exampleSettings";
import { colorScale } from "./exampleUtils";
export default {
  components: { DeckGL, Mapbox, MapView, ZaggedLineLayer },
  name: "Example",
  data() {
    return {
      mapboxToken: MAPBOX_TOKEN,
      mapboxSettings: MAPBOX_SETTINGS,
      deckglSettings: DECKGL_SETTINGS,
      layers: [],
      topVisible: true,
      hasDeckLoaded: false,
      inputData: [],
      colorScale: colorScale,
    };
  },
  created() {
    debugger;
    this.inputData = [
      {
        path: [
          [-122.4, 37.7],
          [-122.5, 37.8],
          [-122.6, 37.85],
        ],
        name: "Richmond - Millbrae",
        color: [255, 0, 0],
      },
    ];
  },
};
</script>

<style scoped lang="css">
#mapbox-3 {
  box-shadow: -5px 5px 20px 5px #575656;
  border: 2px solid #aab6bd;
}
.fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.example {
  width: 100%;
  height: 100%;
}
</style>