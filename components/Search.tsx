import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";

import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query: string }>();
  const [search, setSearch] = useState(params.query);
  console.log("params", params.query)

  
  const handleSearch = (text: string) => {
    setSearch(text);
    
    if(!text.trim()) {
      // If search is empty, reset the query parameter
      router.setParams({ query: "" });
    }
  };

  // Trigger search when user submits via keyboard
  const handleSubmit = () => {
    if(search?.trim())
    router.setParams({ query: search });
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 py-2 mt-5 border rounded-lg bg-accent-100 border-primary-100">
      <View className="z-50 flex flex-row items-center justify-start flex-1">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          placeholder="Search for anything"
          className="flex-1 ml-2 text-sm font-rubik text-black-300"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
