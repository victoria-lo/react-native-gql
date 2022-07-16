import { Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../App";
import { useQuery } from "@apollo/client";
import { CONTINENT_QUERY } from "./gql/Query";
import CountriesScreen from "./CountriesScreen";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("AF");
  const { data, loading } = useQuery(CONTINENT_QUERY);

  const ContinentItem = ({ continent }) => {
    const { name, code } = continent;
    
    return (
      <Pressable style={styles.item} onPress={() => {setModalVisible(true); setCode(code);}}>
        <Text style={styles.header}>{name}</Text>
      </Pressable>
    );
  };

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  return (
    <>
      <FlatList
        data={data.continents}
        renderItem={({ item }) => <ContinentItem continent={item} />}
        keyExtractor={(item, index) => index}
      />
      <CountriesScreen code={code} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </>
  );
}
