import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Header, Container, Content } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';


const categoriesManagement = ({ navigation }) => {

    const [modalVisible, setModalVisable] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState([]);
    const [Loading, setLoading] = useState(true);
   

    useEffect(() => {
        const url = "http://algosys-001-site8.ctempurl.com/api/Categories/GetAllCategories";
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
                setCategories(responseJson)
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
                <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'OpenSans', color: '#fff' }}>اداره الفئات</Text>
            </Header>
            <Content style={{ paddingTop: 20, marginBottom: 20, }} showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 20 }}
                    data={categories}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => {
                        //sending id to another   
                        return (

                            <View style={styles.categoriesManagementWrapper}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('subCategories', {
                                            categoryName: item.CategoryName,
                                            categoryID : item.PK_Category_ID
                                        })}
                                        style={styles.varietyWrapper}>
                                        <Text style={styles.editNameText}>الفئات الفرعيه</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setName(item.CategoryName)
                                            setDesc(item.Description)
                                            setModalVisable(true)
                                        }}
                                        style={styles.editCategoryName}>
                                        <Text style={styles.editNameText}>تعديل</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.subCategoriesName}>{item.CategoryName}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15, marginRight: 22, justifyContent: 'center' }}>
                                    <Text>{item.Description}</Text>
                                </View>
                            </View>


                        )
                    }
                    }
                />
            </Content>


            {/* ------------------open modal------------------------------ */}

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisable(false)}>
                <View style={{ margin: 25 }}>
                    <View>
                        <View style={styles.editingInModal}>
                            <TextInput placeholder={name} style={styles.inputTextinModal} />
                            <Text>الاسم الجديد :- </Text>
                        </View>
                        <View style={styles.editingInModal}>
                            <TextInput placeholder={desc} style={styles.inputTextinModal} />
                            <Text>الوصف الجديد :- </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.saveChanged}
                            onPress={() => setModalVisable(false)}>
                            <Text style={styles.saveText}>حفظ</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>

            {/* -------------------------------close modal------------------------- */}

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
        padding: 20,
        elevation: 4,
        marginBottom: 10,
    },
    subCategoriesName: {
        fontFamily: 'OpenSans',
        fontSize: 18,
    },
    editCategoryName: {
        backgroundColor: '#7f428a',
        borderRadius: 10,
        padding: 10
    },
    editNameText: {
        color: '#fff',
        fontFamily: 'OpenSans'
    },
    varietyWrapper: {
        backgroundColor: '#347235',
        borderRadius: 10,
        padding: 10
    },
    saveChanged: {
        backgroundColor: '#33cc33',
        borderRadius: 10,
        padding: 10,
        marginLeft: 70,
        marginRight: 70,
        justifyContent: 'center',
        marginTop: 30,
    },
    saveText: {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'OpenSans',
        fontSize: 18
    },
    editingInModal: {

        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputTextinModal: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
})

export default categoriesManagement;