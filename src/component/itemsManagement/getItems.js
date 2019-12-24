import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, Image } from 'react-native';
import { Header, Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


const getItems = ({ navigation }) => {



    const [items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);


    useEffect(() => {
        const url = "http://algosys-001-site8.ctempurl.com/api/Items/ItemList?id=1068&pageNumber=0";
        var tokn = 'Bearer z6GgTzDiCl_Cd0xuThfcf3I-J5nAqMFf0GMZQ3oknn43qPV7FP9m2UjGhK9N47BaGqgk-aajm9tMC6ukGFyf2os_KhtsB_xvjaFrssHU28jeTpGyvMv2aYlaO_RDd8QHJgZ0vBlWUMbb1db47_8NK_rYVqbdQ4rwh_02aL3hjjzWLnYnqUBY9iuxP8yi8JOsnA-HsOXxtgARCtSP6bNN8xQAEl4CPFEMebsWtpbFHWmH_6qlr4X9Ws5erVvr68HY763cfGtfux9_vASmmDtZIb9irnS9QiSQh8vojg76kHc7YAiKHHq9hmVNE4bsdwn-6EPdlVuxtAQQz0oevp1yqyVz5cYWnJzL1tUrIpEirPhwCu1Sftw2OQtHI-qm7yfckgz3uwRbKlLqjQx0udG8xeFWz5szkxetgEl4kO7Ws3O7nI55MBo65V9kWLbTPj3mnbaP9mt4gTSqucd63EY5EiN2q8SvHnmDaHhZzAT1eJyYwvKTwIV3If-6sonQTn3pdVZB91R1DHkeeTi9eY-MbA';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': tokn,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setItems(responseJson)
                setLoading(false)
            })

            .catch(error => {
                console.error(error);
            });
    }, [])


    if (Loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BA55D3" />
            </View>
        )
    }


    return (
        <Container style={{ backgroundColor: '#e6e6e6' }}>
            <Header style={{ backgroundColor: '#522b59', justifyContent: 'flex-start', elevation: 10 }}>
                <TouchableOpacity
                    style={{ margin: 15, width: 40, height: 40, borderRadius: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='md-arrow-back' size={30} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'OpenSans', color: '#fff' }}>اداره الاصناف</Text>
            </Header>
            <Content style={{ flex: 1, paddingTop: 20 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 20 }}
                    data={items}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => {

                        return (

                            <View style={styles.categoriesManagementWrapper}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text>{item.Title}</Text>
                                    <Text>{item.Description}</Text>
                                </View>

                                <Image style={{ width: 100, height: 100, borderRadius: 10,margin:10 }}
                                    source={{ uri: "http://algosys-001-site8.ctempurl.com/images/Items/" + item.Item_Image }} />


                            </View>


                        )
                    }
                    }
                />
            </Content>



        </Container>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    categoriesManagementWrapper: {
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        elevation: 4,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row'
    },

})

export default getItems;