import { Text, FlatList, Pressable, Modal, View} from "react-native";
import { styles } from "../App";
import { useQuery } from "@apollo/client";
import { COUNTRY_QUERY } from "./gql/Query";

const CountryItem = ({ country }) => {
  const { name, code } = country;
  return (
    <Pressable style={styles.item}>
      <Text style={styles.header}>{name}</Text>
    </Pressable>
  );
};

export default function CountriesScreen(props) {
  const { data, loading } = useQuery(COUNTRY_QUERY, {
    variables: {
      "code": props.code,
    },
  });

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <FlatList
            data={data.continent.countries}
            renderItem={({ item }) => <CountryItem country={item} />}
            keyExtractor={(item, index) => index}
          />
          <Pressable style={styles.button} onPress={() => props.setModalVisible(!props.modalVisible)}>
            <Text style={styles.textStyle}>CLOSE</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
