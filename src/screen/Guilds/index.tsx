import React,{useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';


import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load'
import { GuildProps } from '../../components/Guild';
import { api } from '../../services/api';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props){
  
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds(){
    const response = await api.get("/users/@me/guilds");
    setGuilds(response.data)
    setLoading(false);
  }

  useEffect(()=>{
    fetchGuilds();
  },[])
  return(
    <View style={styles.container} >
      {
        loading ? <Load/> : 
        <FlatList
        data={guilds}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=><ListDivider isCentered />}
        ListHeaderComponent={()=><ListDivider isCentered />}
        style={styles.guilds}
        keyExtractor={item => item.id }
        contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
        renderItem={({item})=>(
          <Guild 
            data={item} 
            onPress={()=>handleGuildSelect(item)}
          />
        )}
      />
      }
    </View>
  );
};