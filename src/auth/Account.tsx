import * as React from "react";
import { supabase } from "../supabase";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import { SessionContext } from "../root";
import { Button } from "../components/Button";
import { Palette } from "../../style/palette";
import { color } from "react-native-reanimated";

export default function Account() {
  const [loading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const session = React.useContext(SessionContext);
  React.useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <View style={[styles.verticallySpaced]}>
      <Text style={[styles.text]}>Email</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input style={[styles.input]} value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
      <Text style={[styles.text]}>UserName</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          style={[styles.input]}
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
      <Text style={[styles.text]}>WebSite</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          style={[styles.input]}
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.button]}>
        <Button
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </View>

      <View style={[styles.verticallySpaced, styles.button]}>
        <Button onPress={() => supabase.auth.signOut()}>Sign Out</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop:5,
    marginLeft:5,
    marginRight:5,
    borderRadius: 25,
    backgroundColor: Palette.DarkBlue,
    
  },
  input:{
    color: "#f8f8ff",
    textDecorationColor: "#f8f8ff",
    tintColor: "#f8f8ff",
    baseColor: "white",
    backgroundColor: Palette.DarkBlue,
    borderRadius: 15,
    padding: 10,
  },
  button:{
    marginLeft:5,
    marginRight:5,
  },
  text:{
    backgroundColor: Palette.Fuchsia,
    borderRadius: 20,
    padding: 10,
    paddingBottom:20,
    color: "white",
    marginRight: 220,
    marginLeft:20,
    marginBottom: -25,
    textAlign: "center",
  },
});
