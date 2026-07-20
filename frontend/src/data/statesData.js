const statesData = [
  {
    state: "Andhra Pradesh",
    places: ["Tirupati Balaji", "Araku Valley", "Visakhapatnam (RK Beach)", "Amaravati", "Srisailam", "Lepakshi Temple", "Borra Caves", "Vijayawada", "Horsley Hills", "Gandikota"]
  },
  {
    state: "Arunachal Pradesh",
    places: ["Tawang Monastery", "Ziro Valley", "Bomdila", "Sela Pass", "Namdapha National Park", "Itanagar", "Dirang", "Mechuka"]
  },
  {
    state: "Assam",
    places: ["Kaziranga National Park", "Kamakhya Temple", "Majuli Island", "Manas National Park", "Sivasagar", "Guwahati", "Hajo", "Jatinga"]
  },
  {
    state: "Bihar",
    places: ["Bodh Gaya", "Nalanda", "Rajgir", "Patna Sahib", "Vaishali", "Vikramshila", "Kesaria Stupa", "Barabar Caves"]
  },
  {
    state: "Chhattisgarh",
    places: ["Chitrakote Falls", "Bastar", "Barnawapara Wildlife Sanctuary", "Sirpur", "Kanger Valley National Park", "Bhoramdeo Temple", "Tirathgarh Falls"]
  },
  {
    state: "Goa",
    places: ["Baga Beach", "Calangute Beach", "Basilica of Bom Jesus", "Anjuna Beach", "Dudhsagar Falls", "Fort Aguada", "Palolem Beach", "Se Cathedral", "Chapora Fort"]
  },
  {
    state: "Gujarat",
    places: ["Statue of Unity", "Rann of Kutch", "Somnath Temple", "Gir National Park", "Dwarka", "Sabarmati Ashram", "Ahmedabad", "Champaner-Pavagadh", "Nagoa Beach (Diu)"]
  },
  {
    state: "Haryana",
    places: ["Kurukshetra", "Surajkund", "Pinjore Gardens", "Sultanpur Bird Sanctuary", "Morni Hills", "Kalesar National Park"]
  },
  {
    state: "Himachal Pradesh",
    places: ["Manali", "Shimla", "Dharamshala", "Spiti Valley", "Dalhousie", "Kasol", "Kullu", "Chail", "Khajjiar", "Kinnaur"]
  },
  {
    state: "Jharkhand",
    places: ["Netarhat", "Betla National Park", "Hundru Falls", "Deoghar (Baidyanath Temple)", "Patratu Valley", "Jonha Falls", "Parasnath Hills"]
  },
  {
    state: "Karnataka",
    places: ["Mysore Palace", "Hampi", "Coorg", "Bangalore", "Gokarna", "Badami Caves", "Jog Falls", "Chikmagalur", "Belur-Halebidu", "Nandi Hills", "Bandipur National Park"]
  },
  {
    state: "Kerala",
    places: ["Alleppey Backwaters", "Munnar", "Kochi", "Wayanad", "Thekkady", "Kovalam Beach", "Varkala", "Kumarakom", "Athirappilly Falls", "Bekal Fort"]
  },
  {
    state: "Madhya Pradesh",
    places: ["Khajuraho Temples", "Sanchi Stupa", "Kanha National Park", "Bandhavgarh", "Pachmarhi", "Gwalior Fort", "Ujjain", "Orchha", "Bhimbetka Caves", "Omkareshwar"]
  },
  {
    state: "Maharashtra",
    places: ["Ajanta-Ellora Caves", "Mumbai (Gateway of India)", "Lonavala", "Mahabaleshwar", "Shirdi", "Pune", "Nashik", "Alibaug", "Elephanta Caves", "Matheran"]
  },
  {
    state: "Manipur",
    places: ["Loktak Lake", "Imphal", "Kangla Fort", "Keibul Lamjao National Park", "Ima Keithel Market", "Dzuko Valley"]
  },
  {
    state: "Meghalaya",
    places: ["Cherrapunji", "Shillong", "Living Root Bridges (Mawlynnong)", "Dawki", "Mawsynram", "Nohkalikai Falls", "Umiam Lake"]
  },
  {
    state: "Mizoram",
    places: ["Aizawl", "Phawngpui (Blue Mountain)", "Champhai", "Reiek", "Vantawng Falls", "Tam Dil Lake"]
  },
  {
    state: "Nagaland",
    places: ["Kohima", "Dzukou Valley", "Hornbill Festival Venue (Kisama)", "Khonoma Village", "Japfu Peak", "Mokokchung"]
  },
  {
    state: "Odisha",
    places: ["Puri Jagannath Temple", "Konark Sun Temple", "Chilika Lake", "Bhubaneswar Temples", "Simlipal National Park", "Bhitarkanika", "Nandankanan Zoo"]
  },
  {
    state: "Punjab",
    places: ["Golden Temple (Amritsar)", "Wagah Border", "Jallianwala Bagh", "Anandpur Sahib", "Patiala", "Bathinda Fort", "Ropar Wetland"]
  },
  {
    state: "Rajasthan",
    places: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Mount Abu", "Ranthambore", "Bikaner", "Chittorgarh Fort", "Ajmer Sharif"]
  },
  {
    state: "Sikkim",
    places: ["Gangtok", "Nathula Pass", "Tsomgo Lake", "Pelling", "Yumthang Valley", "Ravangla", "Namchi"]
  },
  {
    state: "Tamil Nadu",
    places: ["Meenakshi Temple (Madurai)", "Ooty", "Kanyakumari", "Mahabalipuram", "Rameswaram", "Kodaikanal", "Chennai (Marina Beach)", "Yercaud", "Thanjavur (Big Temple)", "Kumbakonam", "Courtallam Falls"]
  },
  {
    state: "Telangana",
    places: ["Charminar", "Golconda Fort", "Ramoji Film City", "Warangal Fort", "Nagarjuna Sagar", "Bhongir Fort", "Kuntala Waterfalls"]
  },
  {
    state: "Tripura",
    places: ["Ujjayanta Palace", "Neermahal", "Unakoti", "Sepahijala Wildlife Sanctuary", "Jampui Hills", "Tripura Sundari Temple"]
  },
  {
    state: "Uttar Pradesh",
    places: ["Taj Mahal (Agra)", "Varanasi", "Lucknow", "Mathura", "Ayodhya", "Fatehpur Sikri", "Prayagraj", "Agra Fort", "Vrindavan", "Sarnath"]
  },
  {
    state: "Uttarakhand",
    places: ["Rishikesh", "Haridwar", "Nainital", "Kedarnath", "Badrinath", "Gangotri", "Yamunotri", "Mussoorie", "Jim Corbett National Park", "Auli", "Ranikhet", "Valley of Flowers"]
  },
  {
    state: "West Bengal",
    places: ["Kolkata (Victoria Memorial)", "Darjeeling", "Sundarbans", "Digha", "Kalimpong", "Murshidabad", "Shantiniketan", "Siliguri"]
  }
];

export default statesData;
