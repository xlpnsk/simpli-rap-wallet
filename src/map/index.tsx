import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { LatLng, Marker } from "react-native-maps";
import { Palette } from "../../style/palette";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootAuthorizedStackParamList } from "../root/AuthorizedStack";

const defRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const getSearchEndpoint = (shopName: string, bbox: string) => {
  let endpoint: string;
  switch (shopName) {
    case "Żabka":
      endpoint = `https://overpass-api.de/api/interpreter?data=
      [out:json][timeout:25];(
        node["brand:wikidata"=Q2589061][shop=convenience](bbox);
        way["brand:wikidata"=Q2589061][shop=convenience](bbox);
        relation["brand:wikidata"=Q2589061][shop=convenience](bbox);
      );
      out;
      >;
      out skel qt;&bbox=${bbox}`;
      break;
    case "Biedronka":
      endpoint = `https://overpass-api.de/api/interpreter?data=
      [out:json][timeout:25];(
        node["brand:wikidata"=Q857182][shop=supermarket](bbox);
        way["brand:wikidata"=Q857182][shop=supermarket](bbox);
        relation["brand:wikidata"=Q857182][shop=supermarket](bbox);
      );
      out;
      >;
      out skel qt;&bbox=${bbox}`;
      break;
    case "Stokrotka":
      endpoint = `https://overpass-api.de/api/interpreter?data=
      [out:json][timeout:25];(
        node["brand:wikidat"=Q9345945][shop=supermarket](bbox);
        way["brand:wikidata"=Q9345945][shop=supermarket](bbox);
        relation["brand:wikidata"=Q9345945][shop=supermarket](bbox);
      );
      out;
      >;
      out skel qt;&bbox=${bbox}`;
      break;
    case "Rossmann":
      endpoint = `https://overpass-api.de/api/interpreter?data=
      [out:json][timeout:25];(
        node["brand:wikidata"=Q316004][shop=chemist](bbox);
        way["brand:wikidata"=Q316004][shop=chemist](bbox);
        relation["brand:wikidat"a=Q316004][shop=chemist](bbox);
      );
      out;
      >;
      out skel qt;&bbox=${bbox}`;
      break;
    case "Lidl":
      endpoint = `https://overpass-api.de/api/interpreter?data=
      [out:json][timeout:25];(
        node["brand:wikidata"=Q151954][shop=supermarket](bbox);
        way["brand:wikidata"=Q151954][shop=supermarket](bbox);
        relation["brand:wikidata"=Q151954][shop=supermarket](bbox);
      );
      out;
      >;
      out skel qt;&bbox=${bbox}`;
      break;
    default:
      endpoint = "";
  }
  return endpoint;
};

interface IShopData {
  id: number;
  lat: number;
  lon: number;
  tags: {
    "addr:city": string;
    "addr:housenumber": string;
    "addr:postcode": string;
    "addr:street": string;
    brand: string;
    "brand:wikidata": string;
    "brand:wikipedia": string;
    name: string;
    "name:pl": string;
    "name:uk": string;
    shop: string;
  };
}
type Props = NativeStackScreenProps<RootAuthorizedStackParamList, "Map">;

const Map = ({ route }: Props) => {
  const { shopName } = route.params;

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState(defRegion);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shops, setShops] = React.useState<IShopData[]>([]);
  const mapRef: React.LegacyRef<MapView> = useRef();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let coords: LatLng;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  const handler = () => {
    const getBBox = async () => {
      const bbox = await mapRef.current.getMapBoundaries();
      const bboxString = `${bbox.southWest.longitude},${bbox.southWest.latitude},${bbox.northEast.longitude},${bbox.northEast.latitude}`;
      return bboxString;
    };
    const searchStores = async () => {
      const bboxString = await getBBox();
      try {
        const resp = await fetch(getSearchEndpoint(shopName, bboxString), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(resp);
        try {
          const json = await resp.json();
          setShops(json.elements);
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(region);
    mapRef?.current && searchStores();
  };
  return (
    <View style={styles.root}>
      {/* <Text>{text}</Text> */}
      {location && (
        <MapView
          style={{ minHeight: "100%", minWidth: "100%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(region) => {
            setRegion(region);
          }}
          onRegionChangeComplete={handler}
          ref={mapRef}
        >
          <Marker
            key={1}
            coordinate={coords}
            title={"User"}
            description={"User location"}
          />
          {shops.map(
            (shop) =>
              shop.lat &&
              shop.lon && (
                <Marker
                  key={shop.id}
                  coordinate={{ latitude: shop.lat, longitude: shop.lon }}
                  pinColor={Palette.Fuchsia}
                  title={shop?.tags?.name}
                  description={`${shop?.tags?.["addr:city"]}, ${shop?.tags?.["addr:street"]} ${shop?.tags?.["addr:housenumber"]}`}
                />
              )
          )}
        </MapView>
      )}
    </View>
  );
};
export default Map;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
