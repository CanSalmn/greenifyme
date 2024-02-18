import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../../../components";
import CommunityCard from "../../../components/Cards/CommunityCard";

export default function Community() {
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  return (
    <>
      <Header
        title="Community"
        leftStyle={{ flex: 1 }}
        rightStyle={{ flex: 1 }}
        centerStyle={{ flex: 2 }}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >


        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <CommunityCard
            imageSource={require("../../../../assets/images/GreenifyMeLogo.png")}
            communityMerchantName={"GreenifyMe"}
            merchantAddress={"Edirne Merkez/Edirne"}
            isSaved={isSaved}
            setIsSaved={() => setIsSaved(!isSaved)}
          />
          <CommunityCard
            imageSource={require("../../../../assets/images/belediyelogo.png")}
            communityMerchantName={"Edirne Belediyesi"}
            merchantAddress={"Babademirtaş, Mimar Sinan Cd. No:1, 22000 Edirne Merkez/Edirne"}
            isSaved={isSaved}
            setIsSaved={() => setIsSaved(!isSaved)}
          />
          <CommunityCard
            imageSource={require("../../../../assets/images/tema.png")}
            communityMerchantName={"Trakya Üniversitesi Tema"}
            merchantAddress={"Trakya Üniversitesi"}
            isSaved={isSaved}
            setIsSaved={() => setIsSaved(!isSaved)}
          />
        </View>
      </ScrollView>
    </>

  );
}
