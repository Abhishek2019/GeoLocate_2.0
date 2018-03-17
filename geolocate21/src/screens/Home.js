import React from "react";
import { View, Text, Button} from "react-native";


class Home extends React.Component{

    render() {
        return (
            <View>
                <Text>Main Page</Text>
                <Button
                    title="Go to Maps"
                    onPress={() => this.props.navigation.navigate('maps')}
                />
            </View>

        );

    };

}

export default Home;