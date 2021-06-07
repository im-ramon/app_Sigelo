import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Background, cores } from '../../styles/styles';
import { Ionicons, FontAwesome5, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { AppContext } from '../../contexts/appContexts'
import { LinearGradient } from 'expo-linear-gradient';
import myCores from '../../styles/colors'
import Svg, { Path, SvgXml } from "react-native-svg"

export default function Home() {

    const navigation = useNavigation();

    const { signOut, user, setLoading } = useContext(AuthContext);
    const { setPageName, setToday, background, setBackground} = useContext(AppContext);


    const navigateTo = (pageNameNav) => {
        pageNameNav === 'all' ? setPageName('Cadastros ativos') : setPageName('Cadastros vencidos')

        setToday(new Date())
        navigation.navigate('UserList')
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={style.bodyBackground}>
                <View style={style.root}>

                    <View style={style.menu}>
                        <TouchableOpacity style={style.menuItem} onPress={() => signOut()}>
                            <Ionicons name="exit-sharp" size={40} color={cores.color5} style={{ transform: [{ rotate: "180deg" }] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.menuItem} onPress={() => { navigation.navigate('Conf') }}>
                            <Ionicons name="settings-sharp" size={40} color={cores.color5} />
                        </TouchableOpacity>
                    </View>

                    <Text style={style.textWelcome}>Bem vindo, {user.nome}!</Text>

                    <LinearGradient
                        colors={[myCores.color3, `${myCores.color1}25`]}
                        style={style.headerMenu}>
                        <Text style={style.textHeaderMenu}>MENU</Text>
                    </LinearGradient>

                    <View style={style.sectionMaster}>
                        <ScrollView style={style.sectionScrollView}>
                            <View style={style.section}>

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '2' || user.tipoUser == '3' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btnLarge} onPress={() => { navigation.navigate('ScannerQR') }}>
                                        <AntDesign name="qrcode" size={64} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Escanear adesivo</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '2' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigateTo('all') }}>
                                        <Svg
                                            width={64}
                                            height={64}
                                            viewBox="0 0 512 512"

                                        >
                                            <Path d="M 355.85352 33.082031 C 353.4468 33.132993 351.41248 34.880636 350.99805 37.251953 L 347.9375 59.023438 C 347.60457 61.416615 346.10087 63.48675 343.92773 64.542969 C 340.52399 66.192913 337.25013 68.098839 334.13477 70.244141 C 332.11555 71.65127 329.52485 71.949478 327.23828 71.039062 L 306.82617 62.820312 C 304.59238 61.970906 302.07061 62.850715 300.85156 64.90625 L 281.4082 98.548828 C 280.21267 100.60911 280.66546 103.22953 282.48438 104.76758 L 299.84766 118.4082 C 301.77662 119.9208 302.81415 122.30158 302.60742 124.74414 C 302.43923 126.59903 302.34375 128.46356 302.34375 130.35938 C 302.34375 131.68711 302.40656 133.01345 302.49219 134.33984 C 280.81186 132.30066 262.36083 132 256 132 C 242 132 170.35953 133.00055 131.51953 152.31055 C 105.29953 165.36055 92.650156 192.10086 83.410156 211.63086 L 83.330078 211.78906 C 82.869233 211.85386 82.417045 211.96967 81.980469 212.13086 C 81.316939 212.04826 80.649112 212.00396 79.980469 212 L 64.349609 212 C 55.887933 211.9224 48.779794 218.3435 48 226.76953 C 47.640568 231.39635 49.316492 235.95058 52.589844 239.24023 C 54.251208 240.96497 53.796714 243.80052 51.679688 244.91992 C 42.959688 249.63992 34.680312 254.10992 29.570312 260.91992 C 27.330312 263.91992 21.410781 271.75016 17.800781 312.16016 C 15.800781 334.90016 15.500312 358.43961 17.070312 373.59961 C 20.360312 405.09961 26.529063 424.13969 26.789062 424.92969 C 28.721529 430.79754 33.860677 435.02967 39.990234 435.80078 L 39.990234 436 C 39.990234 444.83656 47.153678 452 55.990234 452 L 111.99023 452 C 120.82679 452 127.99023 444.83656 127.99023 436 C 136.60023 436 142.58945 434.46031 148.93945 432.82031 C 158.10726 430.35002 167.47812 428.70662 176.93945 427.91016 C 207.44945 425.00016 237.79 424 256 424 C 273.84 424 305.52008 425.00016 336.08008 427.91016 C 345.57881 428.70841 354.98599 430.35806 364.18945 432.83984 C 370.26945 434.39984 376.0393 435.84023 384.0293 435.99023 C 384.0293 444.82679 391.19274 451.99023 400.0293 451.99023 L 456.0293 451.99023 C 464.86586 451.99023 472.0293 444.82679 472.0293 435.99023 L 472.0293 435.86914 C 478.17398 435.11252 483.33092 430.87974 485.26953 425 C 485.52953 424.21 491.70023 405.16992 494.99023 373.66992 C 496.56023 358.49992 496.27977 335.0007 494.25977 312.2207 C 490.65977 271.8107 484.73023 263.94047 482.49023 260.98047 C 477.34023 254.14047 469.10086 249.67047 460.38086 244.98047 C 458.26383 243.86107 457.80934 241.02552 459.4707 239.30078 C 462.73873 235.98649 464.39306 231.40743 464 226.76953 C 463.22021 218.3435 456.11207 211.92239 447.65039 212 L 432.05078 212 C 431.38214 212.004 430.71431 212.04826 430.05078 212.13086 C 429.5954 211.93332 429.12345 211.77536 428.64062 211.66016 C 425.48409 204.9884 421.8692 197.47059 417.51172 189.94922 C 419.33771 189.07732 421.44452 188.9454 423.35742 189.70703 L 443.76953 197.92773 C 446.00332 198.77714 448.52509 197.89537 449.74414 195.83984 L 469.1875 162.19727 C 470.39281 160.12117 469.92243 157.47929 468.07422 155.94727 L 447.52148 139.82422 C 447.96609 136.6929 448.1982 133.53572 448.2168 130.37305 C 448.2168 128.47724 448.11683 126.5853 447.9668 124.70312 C 447.73999 122.2412 448.77473 119.8327 450.7168 118.30273 L 468.08789 104.66406 C 469.93783 103.13305 470.40845 100.48786 469.20117 98.412109 L 449.75781 64.769531 C 448.53733 62.715701 446.01589 61.837287 443.7832 62.6875 L 423.375 70.902344 C 421.10048 71.817424 418.51836 71.525242 416.50586 70.125 C 413.41174 67.962336 410.14967 66.051174 406.75 64.410156 C 404.54248 63.359535 403.00665 61.275288 402.6582 58.855469 L 399.60156 37.115234 C 399.12517 34.799162 397.10639 33.122931 394.74219 33.082031 L 355.85352 33.082031 z M 375.87109 101.28125 C 376.6298 101.29649 377.39369 101.34246 378.1582 101.41797 C 391.95583 102.8038 402.86808 113.71604 404.25391 127.51367 C 405.45754 139.70089 398.89803 151.32731 387.86133 156.61133 C 385.53071 155.07891 383.1139 153.62623 380.5293 152.33984 C 371.27473 147.73755 360.14411 144.20023 348.39844 141.44141 C 345.34661 134.02065 345.41929 125.48995 348.99609 117.92969 C 353.92401 107.51357 364.49054 101.0526 375.87109 101.28125 z M 256 163.96094 C 293.9 163.96094 342.69047 169.20094 366.23047 180.96094 C 382.52047 189.07094 391.62992 208.32055 399.66992 225.31055 L 400.66992 227.48047 C 403.22121 232.8703 399.1916 239.05631 393.23047 238.90039 C 360.00047 238.00039 290 235.11914 256 235.11914 C 222 235.11914 152.0007 238.0707 118.7207 238.9707 C 112.75957 239.12662 108.72801 232.94061 111.2793 227.55078 C 111.6293 226.81078 112.00008 226.06055 112.33008 225.31055 C 120.33008 208.31055 129.47953 189.07094 145.76953 180.96094 C 169.30953 169.24094 218.1 163.96094 256 163.96094 z M 63.984375 275.33398 C 72.510937 275.49008 80.590781 278.0768 96.550781 282.7793 C 110.66078 286.9293 120.84062 292.45984 126.64062 296.83984 C 129.55063 298.99984 127.99977 304.63945 124.25977 304.93945 C 107.05782 307.00983 89.745988 308.03226 72.419922 308 C 61.819922 308 50.889375 305.00055 48.859375 295.56055 C 47.469375 289.21055 47.619141 285.64078 48.369141 282.05078 C 48.999141 279.00078 50 276.78 55 276 C 58.25 275.5 61.142187 275.28195 63.984375 275.33398 z M 451.19727 275.36133 C 454.16227 275.32195 456.90406 275.55758 459.53906 276.08008 C 462.10906 276.59008 463.47086 279.35008 463.63086 281.08008 C 464.33615 285.89713 464.16994 290.80219 463.14062 295.56055 L 463.14062 295.55078 C 461.14062 305.03078 450.14008 307.99023 439.58008 307.99023 C 421.92235 307.99423 404.27944 306.9721 386.74023 304.92969 C 383.68023 304.63969 382.25938 299.27008 385.35938 296.83008 C 391.06937 292.34008 401.35922 286.91953 415.44922 282.76953 C 431.40922 278.06703 442.30227 275.47945 451.19727 275.36133 z M 256.19922 340 C 279.01922 340 288.32031 341.00055 313.82031 344.81055 C 339.32031 348.62055 358.59 354.33016 364.5 361.16016 C 375.28 373.40016 359.21062 385.35 345.64062 387 L 345.64062 386.93945 C 332.48062 388.43945 306.16078 387.89062 256.30078 387.89062 C 206.44078 387.89062 180.1307 388.43945 166.9707 386.93945 C 153.3907 385.42945 136.08039 372.59039 147.90039 361.15039 C 155.77039 353.61039 174.13008 347.97078 198.58008 344.80078 C 223.03008 341.63078 233.37922 340 256.19922 340 z " fill={cores.color3} />
                                        </Svg>
                                        <Text style={style.section_btn_text}>Gerenciar veículos</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '2' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('Register') }}>

                                        <Svg
                                            width={64}
                                            height={64}
                                            viewBox="0 0 512 512"

                                        >
                                            <Path d="M 396.10156 25.597656 C 352.6374 25.597656 317.27539 60.959669 317.27539 104.42383 C 317.27539 116.04567 319.82399 127.07741 324.35938 137.01953 C 293.84169 132.49925 264.43619 132.06055 256 132.06055 C 242 132.06055 170.36148 133.05914 131.52148 152.36914 C 105.30148 165.41914 92.650156 192.15945 83.410156 211.68945 L 83.330078 211.84961 A 6.52 6.52 0 0 0 81.980469 212.18945 A 17 17 0 0 0 79.980469 212.06055 L 64.351562 212.06055 A 16.27 16.27 0 0 0 48 226.83008 A 15.93 15.93 0 0 0 52.589844 239.30078 A 3.6 3.6 0 0 1 51.679688 244.98047 C 42.959688 249.70047 34.680312 254.17047 29.570312 260.98047 C 27.330312 263.98047 21.410781 271.8107 17.800781 312.2207 C 15.800781 334.9607 15.500312 358.50016 17.070312 373.66016 C 20.360312 405.16016 26.531016 424.20023 26.791016 424.99023 A 16 16 0 0 0 39.990234 435.85938 L 39.990234 436.06055 A 16 16 0 0 0 55.990234 452.06055 L 111.99023 452.06055 A 16 16 0 0 0 127.99023 436.06055 C 136.60023 436.06055 142.59141 434.52086 148.94141 432.88086 A 158.83 158.83 0 0 1 176.94141 427.9707 C 207.45141 425.0607 237.79 424.06055 256 424.06055 C 273.84 424.06055 305.52008 425.0607 336.08008 427.9707 A 159.16 159.16 0 0 1 364.19141 432.90039 C 370.27141 434.46039 376.04125 435.90078 384.03125 436.05078 A 16 16 0 0 0 400.03125 452.05078 L 456.03125 452.05078 A 16 16 0 0 0 472.03125 436.05078 L 472.03125 435.92969 A 16 16 0 0 0 485.27148 425.06055 C 485.53148 424.27055 491.70023 405.23047 494.99023 373.73047 C 496.56023 358.56047 496.27977 335.0593 494.25977 312.2793 C 490.65977 271.8693 484.73023 263.99906 482.49023 261.03906 C 477.34023 254.19906 469.10086 249.72906 460.38086 245.03906 A 3.6 3.6 0 0 1 459.4707 239.35938 A 15.93 15.93 0 0 0 464 226.83008 A 16.27 16.27 0 0 0 447.65039 212.06055 L 432.05078 212.06055 A 17 17 0 0 0 430.05078 212.18945 A 8.5 8.5 0 0 0 428.64062 211.7207 C 424.29676 202.53934 419.13138 191.78274 412.22461 181.58594 C 447.98148 174.12327 474.92773 142.36317 474.92773 104.42383 C 474.92773 60.959669 439.56573 25.597656 396.10156 25.597656 z M 396.10156 68.042969 A 6.063535 6.063535 0 0 1 402.16406 74.105469 L 402.16406 98.359375 L 426.41992 98.359375 A 6.063536 6.063536 0 0 1 426.41992 110.48828 L 402.16406 110.48828 L 402.16406 134.74219 A 6.063535 6.063535 0 0 1 390.03711 134.74219 L 390.03711 110.48828 L 365.7832 110.48828 A 6.063536 6.063536 0 0 1 365.7832 98.359375 L 390.03711 98.359375 L 390.03711 74.105469 A 6.063535 6.063535 0 0 1 396.10156 68.042969 z M 256 164.01953 C 293.9 164.01953 342.69047 169.25953 366.23047 181.01953 C 382.52047 189.12953 391.62992 208.37914 399.66992 225.36914 L 400.66992 227.53906 A 8 8 0 0 1 393.23047 238.96094 C 360.00047 238.06094 290 235.17969 256 235.17969 C 222 235.17969 152.0007 238.1293 118.7207 239.0293 A 8 8 0 0 1 111.28125 227.60938 C 111.63125 226.86937 112.00008 226.11914 112.33008 225.36914 C 120.33008 208.36914 129.48148 189.12953 145.77148 181.01953 C 169.31148 169.29953 218.1 164.01953 256 164.01953 z M 63.984375 275.39453 C 72.510938 275.55062 80.590781 278.13734 96.550781 282.83984 C 110.66078 286.98984 120.84063 292.52039 126.64062 296.90039 C 129.55062 299.06039 127.99977 304.7 124.25977 305 A 427.17 427.17 0 0 1 72.419922 308.06055 C 61.819922 308.06055 50.891328 305.05914 48.861328 295.61914 C 47.471328 289.26914 47.621094 285.69938 48.371094 282.10938 C 49.001094 279.05937 50 276.84055 55 276.06055 C 58.25 275.56055 61.142187 275.3425 63.984375 275.39453 z M 451.19727 275.42188 C 454.16227 275.3825 456.90602 275.61812 459.54102 276.14062 C 462.11102 276.65062 463.47086 279.41062 463.63086 281.14062 A 40.64 40.64 0 0 1 463.14062 295.61914 L 463.14062 295.60938 C 461.14062 305.08938 450.14008 308.05078 439.58008 308.05078 A 455.91 455.91 0 0 1 386.74023 304.99023 C 383.68023 304.70023 382.26133 299.33062 385.36133 296.89062 C 391.07133 292.40062 401.36117 286.98008 415.45117 282.83008 C 431.41117 278.12758 442.30227 275.54 451.19727 275.42188 z M 256.20117 340.06055 C 279.02117 340.06055 288.32031 341.05914 313.82031 344.86914 C 339.32031 348.67914 358.59 354.3907 364.5 361.2207 C 375.28 373.4607 359.21063 385.41055 345.64062 387.06055 L 345.64062 387 C 332.48062 388.5 306.16078 387.94922 256.30078 387.94922 C 206.44078 387.94922 180.1307 388.5 166.9707 387 C 153.3907 385.49 136.08039 372.65094 147.90039 361.21094 C 155.77039 353.67094 174.13008 348.02938 198.58008 344.85938 C 223.03008 341.68937 233.38117 340.06055 256.20117 340.06055 z " fill={cores.color3} />
                                        </Svg>
                                        {/* <Ionicons name="add-circle" size={64} color={cores.color3} /> */}
                                        <Text style={style.section_btn_text}>Cadastrar veículos</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '2' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigateTo('expired') }} >
                                        <Ionicons name="warning-sharp" size={64} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Veículos irregulares</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('ExportAllQR') }}>
                                        <MaterialCommunityIcons name="database-export" size={60} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Exportar todos adesivos</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('Approver') }}>
                                        <FontAwesome5 name="user-check" size={50} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Aprovar usuários</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('Profiles') }}>
                                        <FontAwesome name="users" size={50} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Gerenciar usuários</Text>
                                    </TouchableOpacity>
                                    ) : false
                                }

                                {/* 
                                {user.tipoUser == '0' || user.tipoUser == '1' || user.tipoUser == '-1' ?
                                    (<TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('ExportAQR') }}>
                                        <MaterialCommunityIcons name="file-export" size={60} color={cores.color3} />
                                        <Text style={style.section_btn_text}>Exportar um adesivo</Text>
                                    </TouchableOpacity>
                                    ) : false
                                } */}

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </Background>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: 30,
    },
    menu: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
    },
    menuItem: {
        backgroundColor: `${myCores.light}05`,
        borderRadius: 10,
        width: 70,
        height: 70,
        borderWidth: 5,
        borderColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionScrollView: {
        flex: 1,
    },
    sectionMaster: {
        flex: 10,
        backgroundColor: '#ffffff05',
        width: '100%',
        borderTopColor: `${cores.color5}`,
        borderTopWidth: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    bodyBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textWelcome: {
        flex: 1,
        color: `${cores.color7}`,
        fontSize: 26,
        marginBottom: 40,
    },
    headerMenu: {
        color: `${cores.color7}`,
        transform: [{ translateY: 25 }],
        position: 'absolute',
        top: 133,
        width: 200,
        height: 60,
        borderRadius: 25,
        zIndex: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${cores.color3}`,
        borderColor: `${myCores.black}`,
        borderWidth: 10,
    },
    textHeaderMenu: {
        color: `${myCores.light}`,
        fontWeight: '900',
        fontSize: 22,
    },
    section_btn: {
        borderColor: `${cores.color3}30`,
        borderWidth: 2.5,
        marginBottom: 30,
        backgroundColor: `${cores.color1}`,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
    },
    section_btnLarge: {
        borderColor: `${cores.color3}30`,
        borderWidth: 2.5,
        marginBottom: 30,
        backgroundColor: `${cores.color1}`,
        width: (180 * 2) + 30,
        height: 180 / 1.61803,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
    },
    section_btn_text: {
        color: `${cores.color7}`,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '100',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
});