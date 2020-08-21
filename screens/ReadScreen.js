import React from 'react'
import { View, 
        TextInput, 
        TouchableOpacity, 
        Text, 
        Image, 
        Alert, 
        FlatList } from 'react-native'
import { Header } from 'react-native-elements'
import db from '../config';

export default class ReadScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            search: '',
            allStories: [],
            lastVisibleStory: null,
        }
    }

    SearchStories = async (text) => {
        const story =  await db.collection("stories")
            .where('title','==',text)
            .get()
            if(story.docs.length===0){
                Alert.alert("","The title does not exists in the database");
            }
        story.docs.map((doc)=>{
          this.setState({
            allStories:[doc.data()],
            lastVisibleStory: doc
          })
        })
    }

    fetchMoreStories = async () => {
        var text = this.state.search.toLowerCase();
  
        const query = await db.collection("stories")
            .where('title','==',text)
            .startAfter(this.state.lastVisibleStory)
            .limit(10)
            .get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [doc.data(), ...this.state.allStories ],
            lastVisibleStory: doc
          })
        })
    }

    componentDidMount = async () => {
        const query = await db.collection("stories").get()
        query.docs.map((doc) => {
            this.setState({ 
                allStories: [...this.state.allStories, doc.data() ]
             })
        })
    }

    render(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '-' + mm + '-' + yyyy;
        return (
            <View>
                <Header
                    backgroundColor={'orange'}
                    centerComponent={{
                        text: 'Bedtime Stories',
                        style: { color: 'white', 
                                fontSize: 20 },
                    }}
                    leftComponent={{
                        text: today,
                        style: { color: 'white', 
                                fontSize: 13 },
                    }}
                />
                <View style={{ flexDirection: 'row',marginTop: 5 }}>
                    <TextInput style={{ width: '87%',
                                        height: 50,
                                        backgroundColor: 'white',
                                        borderWidth: 5,
                                        borderColor: 'orange',
                                        color: 'black',
                                        paddingLeft: 20,
                                        fontSize: 18 }}
                                placeholder="Enter title of the book"
                                onChangeText={text=>
                                this.setState({ search: text })} />
                    <TouchableOpacity 
                    onPress={async()=>{this.SearchStories(this.state.search)}}>
                    <Image
                    source={require("../assets/search.jpg")}
                    style={{width:50, height: 50}}/>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={this.state.allStories}
                    renderItem={({item})=>(
                        <View style={{ borderBottomWidth: 2,
                            marginTop: 15,
                            borderTopWidth: 2,
                            backgroundColor: '#FFB6C1' }}>
                            <Text style={{paddingLeft: 25}}>
                                {"Title: " + item.title }
                            </Text>
                            <Text style={{paddingLeft: 25}}>
                                {"Author: " + item.author}
                            </Text>
                        </View>
                    )}
                    keyExtractor= {(item, index)=> index.toString()}
                    onEndReached ={this.fetchMoreStories}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }
}