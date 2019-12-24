import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Container } from 'native-base';


const Main = ({ navigation }) => {

    return (
        <Container>
            <View style={{ flex: 1, margin: 20, justifyContent: 'space-evenly', alignItems: 'center', }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('categoriesManagement')}>
                    <View style={styles.moduleWrapper}>
                        <Text style={styles.moduleName}>اداره الفئات</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback>
                    <View style={styles.moduleWrapper}>
                        <Text style={styles.moduleName}>اداره المستخدمين</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('getItems')}>
                    <View style={styles.moduleWrapper}>
                        <Text style={styles.moduleName}>اداره الاصناف</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.moduleWrapper}>
                        <Text style={styles.moduleName}>اداره الطلبات</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        </Container >
    );

}

const styles = StyleSheet.create({
    moduleWrapper:
    {
        borderRadius: 20,
        backgroundColor: '#522b59',
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    moduleName: {
        color: '#fff',
        fontFamily: 'OpenSans',
        fontSize: 20
    }

})

export default Main;
