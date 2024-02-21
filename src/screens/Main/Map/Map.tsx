import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
} from "react";
import {
    View,
    Text,
    Dimensions,
    Pressable,
    Platform,
    NativeModules,
    Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, {
    Callout,
    CalloutSubview,
    LatLng,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Image, IconButton } from "../../../components";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { h, p, w } from "../../../utils";
import Button from "../../../components/Button";
import {
    GetCurrentPositionOptions,
    requestAndroidPermission,
} from "./utils/utils";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";



const isIos = Platform.OS === "ios" ? true : false;


const initialRegion = {
    latitude: 41.6759,
    longitude: 26.5587,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
};


type markerType = {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
};

export default function Map() {
    const insets = useSafeAreaInsets();
    const [region, setRegion] = React.useState<Region>(initialRegion);

    const [selectedItem, setSelectedItem] = useState<markerType>();
    const snapPoints = useMemo(() => ["25%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const mapRef = useRef<MapView>(null);

    const [errorMsg, setErrorMsg] = useState(null);

    const handleSheetChanges = useCallback((index?: number) => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleSheetClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={1}
            />
        ),
        []
    );

    useEffect(() => {

    }, []);

    useEffect(() => {
        const getUserLocation = async () => {
            console.log("called");
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
        };

        getUserLocation();
    }, []);


    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (region) {
        text = JSON.stringify(region);
    }

    const onPlaceSelected = () => {
        if (region) {
            handleSheetClose();
            openGoogleMapsApp(selectedItem.latitude, selectedItem.longitude);
        }
    };

    const openGoogleMapsApp = (latitude, longitude) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.error("Can't handle URL: " + url);
            }
        });
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <MapView
                ref={mapRef}
                region={region}
                provider={PROVIDER_GOOGLE}
                zoomTapEnabled={false}
                moveOnMarkerPress={true}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                pitchEnabled={false}
                loadingEnabled
                showsMyLocationButton={true}
                showsUserLocation
                showsPointsOfInterest={false}
            >
                {coordinateList.map((marker: markerType, index: number) => (
                    <Marker
                        key={index}
                        draggable={true}
                        stopPropagation
                        onPress={() => {
                            setSelectedItem(marker);
                            handleSheetChanges();
                        }}
                        coordinate={{
                            longitude: marker.longitude,
                            latitude: marker.latitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Pressable
                            onPress={() => setSelectedItem(marker)}
                            style={{
                                width: "auto",
                                backgroundColor: "rgba(255,255,255,0.7)",
                                paddingHorizontal: 6,
                                paddingVertical: 6,
                                borderRadius: 12,
                                alignItems: "center",
                                marginHorizontal: 10,
                                marginVertical: 10,
                            }}
                        >
                            <Image
                                source={require("./../../../../assets/images/mapIcon.png")}
                                style={{ height: 35, width: 35 }}
                            />
                        </Pressable>
                    </Marker>
                ))}

                {/* {showDirections && location && destination && (
                    <MapViewDirections
                        origin={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeColor="#6644ff"
                        strokeWidth={4}
                        onReady={traceRouteOnReady}
                    />
                )} */}
            </MapView>

            <Portal>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    // bottomInset={10}
                    style={{ padding: p(10), paddingTop: 0 }}
                    backgroundStyle={{
                        padding: p(10),
                    }}
                    handleStyle={{}}
                    enablePanDownToClose={true}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            gap: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    fontWeight: "bold",
                                    letterSpacing: 1,
                                }}
                            >
                                Recycle Bin
                            </Text>
                            <Image
                                contentFit="cover"
                                source={require("./../../../../assets/images/recyclerBox.png")}
                                style={{ height: 120, width: 120, aspectRatio: 1 }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 3,
                                gap: 10,
                            }}
                        >
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                <IconButton
                                    icon="location-outline"
                                    iconFamily="Ionicons"
                                    size={30}
                                    IconStyle={{
                                        backgroundColor: "#DBE9E1",
                                        width: 40,
                                        height: 40,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 50,
                                    }}
                                    iconColor="#5DB075"
                                />
                                <View
                                    style={{
                                        gap: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "200",
                                            opacity: 0.8,
                                            letterSpacing: 1.5,
                                        }}
                                    >
                                        Address
                                    </Text>
                                    <Text
                                        style={{ fontSize: 14, fontWeight: "600", opacity: 0.8 }}
                                    >
                                        Edirne, 22323
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                <IconButton
                                    icon="clock-outline"
                                    iconFamily="MaterialCommunityIcons"
                                    size={30}
                                    IconStyle={{
                                        backgroundColor: "#DBE9E1",
                                        width: 40,
                                        height: 40,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 50,
                                    }}
                                    iconColor="#5DB075"
                                />
                                <View
                                    style={{
                                        gap: 5,
                                        flex: 1,
                                        height: "auto",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "200",
                                            opacity: 0.8,
                                            letterSpacing: 1.5,
                                        }}
                                    >
                                        Time
                                    </Text>
                                    <Text
                                        style={{ fontSize: 14, fontWeight: "600", opacity: 0.8 }}
                                    >
                                        03:00PM (Max 20 min)
                                    </Text>
                                </View>
                            </View>
                            <Button
                                title={"Direction"}
                                containerStyle={{ width: w(140), paddingBottom: p(5) }}
                                onPress={() => onPlaceSelected()}
                            />
                        </View>
                    </View>
                </BottomSheet>
            </Portal>
        </View>
    );
}

const coordinateList = [
    {
        latitude: 37.78825,
        longitude: -122.4324,
        title: "box-1",
        description: "test",
    },
    {
        latitude: 41.6759,
        longitude: 26.5587,
        title: "Edirne Selimiye Camii",
        description: "Osmanlı mimarisinin şaheseri olan Selimiye Camii.",
    },
    {
        latitude: 41.6712,
        longitude: 26.5586,
        title: "Edirne Saat Kulesi",
        description: "Edirne'nin simgelerinden biri olan tarihi Saat Kulesi.",
    },
    {
        latitude: 41.6675,
        longitude: 26.5699,
        title: "Edirne Tarihi Tunca Köprüsü",
        description: "Tunca Nehri üzerinde bulunan tarihi köprü.",
    },
    {
        latitude: 41.6702,
        longitude: 26.5567,
        title: "Edirne Karaağaç Tren Garı",
        description: "Osmanlı döneminden kalma tarihi tren garı.",
    },
    {
        latitude: 41.6692,
        longitude: 26.5681,
        title: "Edirne Kırkpınar Yağlı Güreş Alanı",
        description:
            "Dünyanın en eski spor etkinliklerinden biri olan Kırkpınar Yağlı Güreş Festivali'nin düzenlendiği alan.",
    },
    {
        latitude: 41.6723,
        longitude: 26.5569,
        title: "Edirne Gürcü Kapı",
        description: "Edirne'nin tarihi surlarından biri olan Gürcü Kapı.",
    },

    {
        latitude: 41.6748,
        longitude: 26.5622,
        title: "Edirne Darülhadis Medrese",
        description: "Osmanlı döneminden kalma Darülhadis Medrese.",
    },

    {
        latitude: 41.6717,
        longitude: 26.5663,
        title: "Edirne Ali Paşa Çarşısı",
        description: "Ali Paşa Çarşısı'nda alışveriş ve eski mimariyi keşfedin.",
    },

    {
        latitude: 41.6764,
        longitude: 26.5615,
        title: "Edirne Üç Şerefeli Hamam",
        description: "Osmanlı dönemine ait tarihi hamam.",
    },

    {
        latitude: 41.6684,
        longitude: 26.5601,
        title: "Edirne Külliye Caddesi",
        description: "Tarihi ve canlı Külliye Caddesi'nde gezinti imkanı.",
    },

    {
        latitude: 41.6768,
        longitude: 26.5577,
        title: "Edirne Bedesten Hamamı",
        description: "Bedesten Hamamı'nın tarihi ve mimari özellikleri.",
    },

    {
        latitude: 41.6752,
        longitude: 26.5648,
        title: "Edirne Orta Kapı",
        description: "Edirne'nin tarihi surlarındaki Orta Kapı.",
    },

    {
        latitude: 41.6678,
        longitude: 26.5593,
        title: "Edirne Karaağaç Uluslararası Fuar Alanı",
        description: "Karaağaç bölgesinde bulunan uluslararası fuar alanı.",
    },

    {
        latitude: 41.6693,
        longitude: 26.558,
        title: "Edirne Murat Çeşmesi",
        description: "Edirne'nin tarihi çeşmelerinden biri olan Murat Çeşmesi.",
    },

    {
        latitude: 41.6739,
        longitude: 26.5536,
        title: "Edirne Saraçlar Caddesi",
        description: "Saraçlar Caddesi'nde tarihi binalar ve mağazalar.",
    },
    {
        latitude: 41.6756,
        longitude: 26.5626,
        title: "Edirne Uzunköprü Kapı",
        description: "Uzunköprü Kapı'nın tarihi ve mimari özellikleri.",
    },
    {
        latitude: 41.6721,
        longitude: 26.5641,
        title: "Edirne Bedesten Çeşmesi",
        description: "Bedesten Çeşmesi'nin tarihi ve estetik önemi.",
    },
    {
        latitude: 41.671,
        longitude: 26.5678,
        title: "Edirne İstanbul Kapı",
        description: "İstanbul Kapı'nın tarihi surlardaki konumu.",
    },
    {
        latitude: 41.6673,
        longitude: 26.5522,
        title: "Edirne Eski Postane Binası",
        description: "Osmanlı döneminden kalma tarihi postane binası.",
    },
    {
        latitude: 41.6747,
        longitude: 26.5564,
        title: "Edirne Müezzinoğlu Konağı",
        description: "Müezzinoğlu Konağı'nın tarihi ve mimari özellikleri.",
    },
    {
        latitude: 41.6696,
        longitude: 26.5649,
        title: "Edirne Yemişkapanı Han",
        description: "Yemişkapanı Han'ın tarihi ve kültürel önemi.",
    },
    {
        latitude: 41.6761,
        longitude: 26.5654,
        title: "Edirne Zindan Kapı",
        description: "Zindan Kapı'nın tarihi ve stratejik önemi.",
    },
    {
        latitude: 41.6735,
        longitude: 26.5588,
        title: "Edirne Bedesten Camii",
        description: "Bedesten Camii'nin tarihi ve dini önemi.",
    },
    {
        latitude: 41.6709,
        longitude: 26.5611,
        title: "Edirne Rüstem Paşa Han",
        description: "Rüstem Paşa Han'ın tarihi ve mimari özellikleri.",
    },
    {
        latitude: 41.6727,
        longitude: 26.5618,
        title: "Edirne Atatürk Anıtı",
        description: "Mustafa Kemal Atatürk'e ithaf edilmiş anıtın bulunduğu yer.",
    },
];
