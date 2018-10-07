const axios = require('axios');
let key = '&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE';
const getPlacesWithinRange = async (location = [51.517752, -0.064974], radius = 5000, query = 'museum') => {
    const uri = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location='+location[0] + ',' + location[1] + '&radius=' + radius + '&query=' + query + key;
    return (await axios.get(uri)).data.results;
};

const getPlacesCity = async (city, category) =>{
    let query = category + " in " + city;
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + key);
    resultList = [];
    for(let i = 0; i<res.results.length; i++){
        resultList.push(res.results[i]);
    }
    return resultList;
};

const getPlaceDetails = async (id) =>{
    let query = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&fields=opening_hours"+key;
    return (await axios.get(query)).data.result;
};
const getPlacePhotoURL = async (photoid, maxheight) => {
    let query = "https://maps.googleapis.com/maps/api/place/photo?maxheight="+maxheight+"&photoreference="+photoid+key;
    return await axios.get(query);
}

module.exports.getPlacesWithinRange = getPlacesWithinRange;
module.exports.getPlacesCity = getPlacesCity;
module.exports.getPlaceDetails = getPlaceDetails;
module.exports.getPlacePhotoURL = getPlacePhotoURL;


/*
module.exports.getPlacesWithinRange = () => {
    return {
        "html_attributions": [],
        "next_page_token": "CrQCIQEAAEEdcIbHxaYhFGI8oFh-Xk38NBuC0tUJveUgnmPQpgdPFIDysEq3Bv2nRID9vQaPKCZi1f1SeJ90z1uNWe0AzUAjfwUQO260_GxX6ZlOvm4Rgx2E6QEopvG6x3NKRxcTi2TXHjjDimyHRzDEeM6FjfBK_S4CtnVaF1N1enFSLVZECA5I6fkijhr9S2iqx3NesIdHH5S6RZ5U0iUD3b2KpzAUQ_DPHjsEyLM4fDKWQ43b7umHxFlidB1Rj7wHYmgGAoWsgVnTdtuVxErl85z6h9Pezq1uxvyc7cstEVXLWWm8ola2-EL21c2I5YOdqhhrdbwamBFCYWHM746t3jOldpNm7Zw3K829Q9yGsmO7fvcblYCM9ju9m1yJeUT6Mcj5JohskGLue5dLdg-QUZtfkfwSEB4Ejy_VAMd353UljIDJeaoaFFONi-rlZkqqR-smJ6ieylCtulcs",
        "results": [
            {
                "formatted_address": "150 London Wall, London EC2Y 5HN, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5176183,
                        "lng": -0.09677819999999999
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51893717989272,
                            "lng": -0.09399285000000003
                        },
                        "southwest": {
                            "lat": 51.51623752010728,
                            "lng": -0.09770664999999996
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "1cc11ff9ddfd51dad074ba70282851a2428ba560",
                "name": "Museum of London",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3464,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/108886903249933037417/photos\">Thayananthan</a>"
                        ],
                        "photo_reference": "CmRaAAAAIWDEV4mHp4g5ZRYX-rZX3D_zUctRWAWW0YsYr9HPstIQM0Y8YLay0Y5zReTmdPDQHM9cFBeHvl9B2u3Uhv8MkG0E9hmKc3ne3bERBHgXXQNAfskSUk6IHq9aTEtrQ2GzEhD10pDAB9dOyC2GLxWGCN7QGhSeDxghZqIT0E4XVdtWt5wJ2JxMrg",
                        "width": 4618
                    }
                ],
                "place_id": "ChIJ68vBCFUbdkgR5CUqlcHifUA",
                "plus_code": {
                    "compound_code": "GW93+27 City of London, London, UK",
                    "global_code": "9C3XGW93+27"
                },
                "rating": 4.5,
                "reference": "ChIJ68vBCFUbdkgR5CUqlcHifUA",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "19 Princelet St, London E1 6QH, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5198613,
                        "lng": -0.0725073
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.52117072989272,
                            "lng": -0.07115832010727778
                        },
                        "southwest": {
                            "lat": 51.51847107010727,
                            "lng": -0.07385797989272222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "5fe0a4a1c562b31e9b8aecded024c3b50efa580f",
                "name": "19 Princelet Street",
                "photos": [
                    {
                        "height": 2160,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/105002784012014615780/photos\">Rob smyth</a>"
                        ],
                        "photo_reference": "CmRaAAAAaItZ8aHf7D6ZFvee6hBEk49fRX277RE_cjeqmvmvUDymmXo03TUdVqGDDBswhw9TwLCxgiRs6XuNRaE4L8EWbKlMzeM7WvBGrfFpBouEQ1MPloVg-q6GV9aYCBCoPDrOEhDG8TjXNx8T_za02Idj6MV6GhQA5BpkS3sQsPVdvTm-svrkKwQJ9w",
                        "width": 3840
                    }
                ],
                "place_id": "ChIJrRJI8rUcdkgRuPtGxO2_jFE",
                "plus_code": {
                    "compound_code": "GW9G+WX Spitalfields, London, UK",
                    "global_code": "9C3XGW9G+WX"
                },
                "rating": 4.1,
                "reference": "ChIJrRJI8rUcdkgRuPtGxO2_jFE",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "18 Folgate St, London E1 6BX, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5208912,
                        "lng": -0.0777209
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.52228532989272,
                            "lng": -0.07634477010727778
                        },
                        "southwest": {
                            "lat": 51.51958567010728,
                            "lng": -0.07904442989272221
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "c83af0f61387a2e78b8b59712489d247068fc488",
                "name": "Dennis Severs' House",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 1536,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/117880374445334972902/photos\">Dennis Severs&#39; House</a>"
                        ],
                        "photo_reference": "CmRaAAAA6CHxzBfnGD4g9HXB4DMqga9uJg28FQB61V44B1lM6bLbsbUby9hHmvgimk3s-kmxE95bMShwWJ8U891WJTIA48ucxyy0GktKGzBfbt1ApVgjJtax8PUzrfjFIfSGbLqkEhAqKPhMc7_39xosUT5TZrIhGhSWYe1ioNQboRGfp-8izgrT9CnD7w",
                        "width": 2048
                    }
                ],
                "place_id": "ChIJf_GVRLEcdkgR6JZu80EMGOs",
                "plus_code": {
                    "compound_code": "GWCC+9W City of London, London, UK",
                    "global_code": "9C3XGWCC+9W"
                },
                "rating": 4.4,
                "reference": "ChIJf_GVRLEcdkgR6JZu80EMGOs",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "Bartholomew Ln, London EC2R 8AH, UK",
                "geometry": {
                    "location": {
                        "lat": 51.514135,
                        "lng": -0.08763699999999999
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51552462989272,
                            "lng": -0.08620972010727779
                        },
                        "southwest": {
                            "lat": 51.51282497010727,
                            "lng": -0.08890937989272223
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "ca2318fcf34fc3c0c995f87f0f1fcb5f87e5393a",
                "name": "Bank of England Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 1512,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104306650798958091665/photos\">D.A.</a>"
                        ],
                        "photo_reference": "CmRaAAAAlP4X_IxtN_DobK6dfQYFgEhrbiCqx9W-fP6dF0z4VPcNrjQyEZFWDnKdlQ8rP4mwfjEJGJhmoK72W5vCSfe9ac9GPyHnTlBedqkd1VgoKiKT79Vu4AYLAFsyhTTmyvwUEhCW68oBt7gdt6Rm-AJITjnVGhT5Fmay3-byw7z37Q53WtpxmIiUDw",
                        "width": 2016
                    }
                ],
                "place_id": "ChIJ08o_oFQDdkgRDZ6tiQDJXOc",
                "plus_code": {
                    "compound_code": "GW76+MW City of London, London, UK",
                    "global_code": "9C3XGW76+MW"
                },
                "rating": 4.4,
                "reference": "ChIJ08o_oFQDdkgRDZ6tiQDJXOc",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "Great Russell St, Bloomsbury, London WC1B 3DG, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5194133,
                        "lng": -0.1269566
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.52145429999999,
                            "lng": -0.12477735
                        },
                        "southwest": {
                            "lat": 51.51732029999999,
                            "lng": -0.12914235
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "ad6aaec7b7b0fa2c97a127c24845d76135e760ae",
                "name": "The British Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 2000,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/113816605894668540779/photos\">Sami Grek</a>"
                        ],
                        "photo_reference": "CmRaAAAAnFE95AI3z5ECqNxQPN3lctMs9XE_GU-LNVRLxrijvAZAaMqQPujJ4WdU9SAUyppZIXjalarsFPpfBN0CEkc4PKRw9U8195YapdgT1HICvRbymCiNX6wBL_Zjlwyv5SSeEhB810MWbtUxq_-Wylbqnxn3GhT9hEwybjmgGQRQR3ONsnIW8ZSNxA",
                        "width": 3008
                    }
                ],
                "place_id": "ChIJB9OTMDIbdkgRp0JWbQGZsS8",
                "plus_code": {
                    "compound_code": "GV9F+Q6 Bloomsbury, London, UK",
                    "global_code": "9C3XGV9F+Q6"
                },
                "rating": 4.7,
                "reference": "ChIJB9OTMDIbdkgRp0JWbQGZsS8",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "66 Leonard St, London EC2A 4LW, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5246151,
                        "lng": -0.08346809999999999
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.52596492989272,
                            "lng": -0.08211827010727776
                        },
                        "southwest": {
                            "lat": 51.52326527010727,
                            "lng": -0.0848179298927222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "fb134547f79c4b607d063f69e8d51e2255a5ac2c",
                "name": "Museum of Happiness",
                "photos": [
                    {
                        "height": 3096,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104614256124519877164/photos\">James Light</a>"
                        ],
                        "photo_reference": "CmRaAAAAP-NBFI0idCA8ID1mgl1UBksut9hPzTRWXthc0E9-g1-AE-fhsRvDmCeF5y3nH80CtlJIO23O0fae1hx27tjde_0emK9W51dmWY8g_frC_E0uJYoPJpIWiakUeTY942IEEhDwVKUbCAJjGp9JtOTVcbXmGhQXhtblwsgyBoo1JwYoF0za6-ia_w",
                        "width": 4128
                    }
                ],
                "place_id": "ChIJeQ_I4rUcdkgRC0p0BffjZPc",
                "plus_code": {
                    "compound_code": "GWF8+RJ Camden Town, London, UK",
                    "global_code": "9C3XGWF8+RJ"
                },
                "rating": 4.4,
                "reference": "ChIJeQ_I4rUcdkgRC0p0BffjZPc",
                "types": [
                    "museum",
                    "gym",
                    "health",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "St Augustine with St Philip's Church, Newark St, Whitechapel, London E1 2AA, UK",
                "geometry": {
                    "location": {
                        "lat": 51.517224,
                        "lng": -0.060198
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51850007989272,
                            "lng": -0.05883052010727778
                        },
                        "southwest": {
                            "lat": 51.51580042010727,
                            "lng": -0.06153017989272222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "1b22f4a9bde275c2cd06d28fec5ece47191748d6",
                "name": "The Royal London Hospital Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 2448,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/105554190460897158302/photos\">Paul Atherton</a>"
                        ],
                        "photo_reference": "CmRaAAAAPrV4TUu3s91jtEWOUeohKk9UAPuSWod1pgnQxJ385FrGE7bdpAcpMxuSlNjJ40VX6WOSt2AMM69ohe8XrThuENAJrU6HNc92kVX6wyRsr9lEdIB218rf0qmrLlXZUjxkEhBZLwCo2BaOs0qSEI6UJFtCGhSzr0mf6d1NcnFq4jPbCZCmlxEEXg",
                        "width": 3264
                    }
                ],
                "place_id": "ChIJ69Amvc0cdkgRJAb7Kf9W_-I",
                "plus_code": {
                    "compound_code": "GW8Q+VW Whitechapel, London, UK",
                    "global_code": "9C3XGW8Q+VW"
                },
                "rating": 4.2,
                "reference": "ChIJ69Amvc0cdkgRJAb7Kf9W_-I",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "12 Cable St, Whitechapel, London E1 8JG, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5107921,
                        "lng": -0.0679327
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51217382989272,
                            "lng": -0.0665875201072778
                        },
                        "southwest": {
                            "lat": 51.50947417010727,
                            "lng": -0.06928717989272223
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "04d9f9788e81ce7e7e3955927753416d192fe9c3",
                "name": "Jack The Ripper Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3024,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104003226942294480287/photos\">Utopic By Mona Vulpoiu</a>"
                        ],
                        "photo_reference": "CmRaAAAAd5MB7fVkq4Vhv65fHM4l3vGAdrVW_fj-UkKJdidF7LOFI8sCXEBr0e8PTo-YZ9r-hVsroOWTqjljwbL6PVMDgmQ84ScL0SZ5fiyzsE3G1GbtNMXf_heFRGH0EZMj29hWEhDsP-OKlczUtCai0alXAAaUGhR4wp8QlpJEaqhSCe_U6BrBCSXxOA",
                        "width": 4032
                    }
                ],
                "place_id": "ChIJP0WVyDUDdkgRyXw130nxbxE",
                "plus_code": {
                    "compound_code": "GW6J+8R Whitechapel, London, UK",
                    "global_code": "9C3XGW6J+8R"
                },
                "rating": 4,
                "reference": "ChIJP0WVyDUDdkgRyXw130nxbxE",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "136 Kingsland Rd, London E2 8EA, UK",
                "geometry": {
                    "location": {
                        "lat": 51.53165749999999,
                        "lng": -0.07681059999999999
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.53293649999998,
                            "lng": -0.07544217010727779
                        },
                        "southwest": {
                            "lat": 51.52990809999999,
                            "lng": -0.07814182989272223
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "17f02f19944110c7d6371044171df154b99a747c",
                "name": "Geffrye Museum",
                "photos": [
                    {
                        "height": 3036,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/112106318097999188565/photos\">Suzanne Seyghal Buckingham</a>"
                        ],
                        "photo_reference": "CmRaAAAAAwkgeYNrDd79zkhSJTg1I6B1PXwiM1m8GYuvlVSxzblXrvBbKcUypdG061-IfXFBgBlVQeIX5Nf_cdwAZp4CdTtVa2f1tnoXxONvl7lV2oDAQ8yddij5NTHcUoTgLoTvEhC07iMAqyRvl3qeZARDVmJIGhTo5LA1bpq19PM99pFgpmpkHnWBSg",
                        "width": 4048
                    }
                ],
                "place_id": "ChIJh7c4BLwcdkgRFha3f8X3CCo",
                "plus_code": {
                    "compound_code": "GWJF+M7 Hoxton, London, UK",
                    "global_code": "9C3XGWJF+M7"
                },
                "rating": 4.4,
                "reference": "ChIJh7c4BLwcdkgRFha3f8X3CCo",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "Cambridge Heath Rd, London E2 9PA, UK",
                "geometry": {
                    "location": {
                        "lat": 51.52904090000001,
                        "lng": -0.0549519
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.53047537989272,
                            "lng": -0.05400687010727779
                        },
                        "southwest": {
                            "lat": 51.52777572010727,
                            "lng": -0.05670652989272222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "3f23d615499c25f3e82855c97139ffa0ce0403db",
                "name": "V&A Museum of Childhood",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3024,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/101258543304231219268/photos\">Hong Jiang</a>"
                        ],
                        "photo_reference": "CmRaAAAAfayF48iR1WVlWy6XJupTP19xZ2HVVBtfCaSsABaWWqILOuJxKlHe8hkdTgWmOffGESBNB_MgxBSfR_pQWiHMwf-EZzZAl8cLGRfOQFRsgn423dE_rURnCQ74tJ2Q67LEEhAVXP90uh8MyRo2TRhQSEpFGhTd2Msjav0vbMTnqQ6Z9TzXxFqwXA",
                        "width": 4032
                    }
                ],
                "place_id": "ChIJyxOhp9scdkgR3ciFcAfeG1c",
                "plus_code": {
                    "compound_code": "GWHW+J2 Cambridge Heath, London, UK",
                    "global_code": "9C3XGWHW+J2"
                },
                "rating": 4.3,
                "reference": "ChIJyxOhp9scdkgR3ciFcAfeG1c",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "1 Reading Ln, London E8 1GQ, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5445,
                        "lng": -0.055854
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.54597267989272,
                            "lng": -0.05451262010727779
                        },
                        "southwest": {
                            "lat": 51.54327302010728,
                            "lng": -0.05721227989272221
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "d6386f874bae41578ced40ee3f180d0d895a5a66",
                "name": "Hackney Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3456,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104154278317805242417/photos\">Hackney Museum</a>"
                        ],
                        "photo_reference": "CmRaAAAAveIagpabeduwr5HG-2PQ4YbvfOZfP8c7mvACJt-HJk7aAL5QQZoPQwnXNKvEAMkl5YaaAHzFYpmSWNreOGH3VNsFmqNAHgtm0ZE4j_af7cqG6410Swiuv0_0mW5G9dZmEhDet_eqTyM5aOT-38gjik6xGhRO5i-seihOa64V0DML49RO6YmVXA",
                        "width": 5184
                    }
                ],
                "place_id": "ChIJ_fA_HeUcdkgRmfM_pfgWFgY",
                "plus_code": {
                    "compound_code": "GWVV+QM Hackney, London, UK",
                    "global_code": "9C3XGWVV+QM"
                },
                "rating": 4.6,
                "reference": "ChIJ_fA_HeUcdkgRmfM_pfgWFgY",
                "types": [
                    "museum",
                    "art_gallery",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "Covent Garden Piazza, London WC2E 7BB, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5118912,
                        "lng": -0.1215718
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51333927989273,
                            "lng": -0.1202622701072778
                        },
                        "southwest": {
                            "lat": 51.51063962010728,
                            "lng": -0.1229619298927222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "1390c6eda79aaacd0786258e43d514115f067586",
                "name": "London Transport Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3264,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104751430535765082100/photos\">Daniel Vodňanský</a>"
                        ],
                        "photo_reference": "CmRaAAAAvKyNTe0NAI7mvt7XQCD8uxIAFvgJ9_aBNEehiT2i3CZ5YjvdBBzjVfyW5JTyg-RUMnTJEEZ4oA_HE08oYiO_2BIjHs5i_GUC-0PH__Wt32dH-DQvsQpmtFYQPJQW9i4gEhA_hJkPeBMkXinLbTy4tK8JGhSmS2g0fo4n-POvcqhdVs9zw2O9kA",
                        "width": 4928
                    }
                ],
                "place_id": "ChIJG7j3T8oEdkgR8UWt8_cLorU",
                "plus_code": {
                    "compound_code": "GV6H+Q9 Covent Garden, London, UK",
                    "global_code": "9C3XGV6H+Q9"
                },
                "rating": 4.4,
                "reference": "ChIJG7j3T8oEdkgR8UWt8_cLorU",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "35 Tower Hill, St Katharine's & Wapping, London EC3N 4DR, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5083111,
                        "lng": -0.0753127
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51027717989273,
                            "lng": -0.07431487010727779
                        },
                        "southwest": {
                            "lat": 51.50757752010728,
                            "lng": -0.07701452989272223
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "d1fc1dabb767519931548cc7eff9baa3066ff651",
                "name": "The Fusilier Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 2664,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/103256392082513949806/photos\">José Antonio Neves</a>"
                        ],
                        "photo_reference": "CmRaAAAAzkeNtlEfzQRvIHYKKHGW08HwvSag0r9zLLip7nUI_SAGgKnAnU7A22VqBfFTer4IEQjZv0rZrFUdCd33l5DotGhLjMYIJ-G-0ryYaftFP20FOwnxjQmmMBoiAnU8IPR4EhDUgHpNZM3G9rGNko1kgIVeGhSj8rFLjGusKP3M8eMs61erVcL9Vw",
                        "width": 4000
                    }
                ],
                "place_id": "ChIJO9XtOEkDdkgRfIzM5v3oyjY",
                "plus_code": {
                    "compound_code": "GW5F+8V St Katharine's & Wapping, London, UK",
                    "global_code": "9C3XGW5F+8V"
                },
                "rating": 4.1,
                "reference": "ChIJO9XtOEkDdkgRfIzM5v3oyjY",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "11 Mare St, London E8 4RP, UK",
                "geometry": {
                    "location": {
                        "lat": 51.534646,
                        "lng": -0.0576011
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.53598582989272,
                            "lng": -0.05607902010727778
                        },
                        "southwest": {
                            "lat": 51.53328617010727,
                            "lng": -0.05877867989272222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "9c676b89235b437914570969323827d57b4ca89f",
                "name": "The Viktor Wynd Museum of Curiosities",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 2832,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/111667704476323287430/photos\">Robert Wallis</a>"
                        ],
                        "photo_reference": "CmRaAAAAuwsL5L55OPxwXZJ-npIX2PqnBhPGkMUtzhOAUavKMQ-bmQfnAP1Lo8ns7OHq7kQa8Cui1A1CyQYIP0Rc9ZCJpOPKtHv9fJ92kSo5kzgwQLRrtKHJ06X9Q9Ou8MKslQyuEhBLm7lajPldpGbA1SqvP5dhGhTSCOXG90hkPAy5OomPRV41K8yuqQ",
                        "width": 4240
                    }
                ],
                "place_id": "ChIJq_RMR90cdkgRX4F8wxTGKhE",
                "plus_code": {
                    "compound_code": "GWMR+VX Cambridge Heath, London, UK",
                    "global_code": "9C3XGWMR+VX"
                },
                "rating": 4.5,
                "reference": "ChIJq_RMR90cdkgRX4F8wxTGKhE",
                "types": [
                    "museum",
                    "cafe",
                    "food",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "London SE1 1XT, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5035646,
                        "lng": -0.08954289999999999
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.50491442989272,
                            "lng": -0.08819307010727777
                        },
                        "southwest": {
                            "lat": 51.50221477010728,
                            "lng": -0.09089272989272221
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "ad2fd425c3608bd2192ace371ebb6d9b5fd08ca6",
                "name": "Gordon Museum",
                "photos": [
                    {
                        "height": 4608,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/107501746342402445394/photos\">A Google User</a>"
                        ],
                        "photo_reference": "CmRaAAAAY01XtJv0DB68DbIKrA3a1HXq6VyUpr6KnAI9KHhgiTTb9O2fLqd01uNiUCKwuSA8iR6mEB-OrlXo1MfycaBRN5c4KX3OVYaakE7eEf4mvpzr7v0hY1M7vnFfzB6uzjN-EhDx4829v0g1JGJgsNdwhSlRGhQ89_KUleuJYQaRz6sGbmowP94G5A",
                        "width": 3456
                    }
                ],
                "place_id": "ChIJ8RltwlkDdkgRzEfxF6Y_lpg",
                "plus_code": {
                    "compound_code": "GW36+C5 Southwark, London, UK",
                    "global_code": "9C3XGW36+C5"
                },
                "rating": 4.4,
                "reference": "ChIJ8RltwlkDdkgRzEfxF6Y_lpg",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "136 Kingsland Rd, London E2 8EA, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5317222,
                        "lng": -0.0768947
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.53307347989272,
                            "lng": -0.07561052010727777
                        },
                        "southwest": {
                            "lat": 51.53037382010728,
                            "lng": -0.07831017989272221
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "6b213dd0a80441da0b10e5390f654fa46efded7d",
                "name": "Geffrye Museum of the Home",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3024,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/106582761994232674621/photos\">Seth Tanner</a>"
                        ],
                        "photo_reference": "CmRaAAAAeqUOqlBiU2inNFcmahU8xN_hA97p494IUpchD1ZUbKEmBV1BOZPACzqyb79jGYLdi5e7JzAHVhKddDBkYMiqpdFeoGVaodpmfu3QzQoqWff4bXVZ3aIt77XPF0Ll2yzmEhBrWB3flsbHpoBLtJ2-ZqztGhSV3AEHqm2KDNbIcd-KF8QWQ_3yjg",
                        "width": 4032
                    }
                ],
                "place_id": "ChIJKUrjG7wcdkgRbfTuKDBgWXI",
                "plus_code": {
                    "compound_code": "GWJF+M6 Hoxton, London, UK",
                    "global_code": "9C3XGWJF+M6"
                },
                "rating": 4.4,
                "reference": "ChIJKUrjG7wcdkgRbfTuKDBgWXI",
                "types": [
                    "museum",
                    "park",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "24 W Smithfield, London EC1A 7BE, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5173757,
                        "lng": -0.1008511
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.51887697989272,
                            "lng": -0.09971802010727777
                        },
                        "southwest": {
                            "lat": 51.51617732010727,
                            "lng": -0.1024176798927222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "dc269ad5997ddcf359bb6fb69af9bf04c0aae08b",
                "name": "Barts Pathology Museum",
                "photos": [
                    {
                        "height": 1920,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/115892004207740275884/photos\">Aldo Medrano</a>"
                        ],
                        "photo_reference": "CmRaAAAAdp0jXZrRKQ7MfvUpGO41wCDiWU11hyNwaR7QgegLvFZt_ZWefdsSJesSkJUikJSfqsCED7BrB1l1XopA8lQlq2PpzUdOb4xpatBQssYQF5H3Nepm7d18YNsgpQWpKpuwEhA1eV-I2oLYAbJHvP4BfYWWGhTZUQ6Q3j8hKkgSWw4eGi6qzefXdw",
                        "width": 2560
                    }
                ],
                "place_id": "ChIJ232RdlMbdkgRwzU4w1AN0dI",
                "plus_code": {
                    "compound_code": "GV8X+XM City of London, London, UK",
                    "global_code": "9C3XGV8X+XM"
                },
                "rating": 4.5,
                "reference": "ChIJ232RdlMbdkgRwzU4w1AN0dI",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "Bermondsey St, London SE1 3UD, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5016147,
                        "lng": -0.08257490000000001
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.50299422989272,
                            "lng": -0.08103292010727779
                        },
                        "southwest": {
                            "lat": 51.50029457010728,
                            "lng": -0.08373257989272223
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "87e2e76820c7f25a34c95e2c560c3cd81ab570df",
                "name": "Glass Museum",
                "photos": [
                    {
                        "height": 800,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/104371580652751334348/photos\">David Newman</a>"
                        ],
                        "photo_reference": "CmRaAAAA23yQlOpAcfJlQyZjyU6x_IRxRXmBAFv9hLfN3vozw8fDwo4Xm3CxkgX9RG_JChhaHa5ZusV7d2FvcZ4ehlQjXOOOwxDcfE-ySWfU54z_XHwF72UTOYWMGbLwGqOBzfrEEhCFCDf2DQdWaCd43vXA6A5DGhQ0cAeeHBDkcGA44iHoXr0DNAJsPg",
                        "width": 1200
                    }
                ],
                "place_id": "ChIJja5uKVsDdkgRxwmCbS0s7OY",
                "plus_code": {
                    "compound_code": "GW28+JX Kipling Estate, London, UK",
                    "global_code": "9C3XGW28+JX"
                },
                "rating": 4.5,
                "reference": "ChIJja5uKVsDdkgRxwmCbS0s7OY",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "1 Clink St, London SE1 9DG, UK",
                "geometry": {
                    "location": {
                        "lat": 51.5070209,
                        "lng": -0.0918904
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.50841342989272,
                            "lng": -0.09057377010727778
                        },
                        "southwest": {
                            "lat": 51.50571377010728,
                            "lng": -0.09327342989272222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
                "id": "b0cdfdcaada357b8a0f41399aab7964f5d072823",
                "name": "The Clink Prison Museum",
                "opening_hours": {
                    "open_now": false
                },
                "photos": [
                    {
                        "height": 3456,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/100326035528531802509/photos\">Ева Къчева</a>"
                        ],
                        "photo_reference": "CmRaAAAA2NcpeL-4vG4rrdH8uKpRFItB_GtQCnt0jI0GGUwRNKVuuuQxcrpVcXIe-fd7DDVXkub510d7bi3zpzbPGZQqp9PrD6K2G4V4izsgm4CPGVPgrwLMVxHgVMVhXCqG8GWAEhBR_8iGkXBagQQE1iQQJDFTGhRjd3QzG9zHF93ygukZtXh87UIhCg",
                        "width": 4608
                    }
                ],
                "place_id": "ChIJSdAbs1cDdkgRh097pZt1ds4",
                "plus_code": {
                    "compound_code": "GW45+R6 City of London, London, UK",
                    "global_code": "9C3XGW45+R6"
                },
                "rating": 3.8,
                "reference": "ChIJSdAbs1cDdkgRh097pZt1ds4",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "formatted_address": "99 Southwark St, London SE1 0JF, UK",
                "geometry": {
                    "location": {
                        "lat": 51.505996,
                        "lng": -0.1015026
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 51.50739497989272,
                            "lng": -0.1001162701072778
                        },
                        "southwest": {
                            "lat": 51.50469532010728,
                            "lng": -0.1028159298927222
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
                "id": "58a9d45f20736b07b3174aaab236e8358fe0e25f",
                "name": "Kirkaldy's Testing Museum",
                "photos": [
                    {
                        "height": 3934,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/101934055015538124393/photos\">Cat Morley</a>"
                        ],
                        "photo_reference": "CmRaAAAAueGvaeraPRgt-37T3RBggg6EVZFfVwbATRF99Kvm_mk7qLrlfSiV5c3QXwjfBdlAfczVEbj_xYJAbMmUMN_1I26VQGXp25wV9CIWoyklc-idwmBPv4D3xy--YxoSMRYUEhBraUnfdhqk-M9H6Z-8jsg_GhT94SXFSWdkBypUFaqk55Hnq8LBQg",
                        "width": 5900
                    }
                ],
                "place_id": "ChIJZ7cPFK8EdkgRNtgccwPRuwI",
                "plus_code": {
                    "compound_code": "GV4X+99 South Bank, London, UK",
                    "global_code": "9C3XGV4X+99"
                },
                "rating": 4.7,
                "reference": "ChIJZ7cPFK8EdkgRNtgccwPRuwI",
                "types": [
                    "museum",
                    "point_of_interest",
                    "establishment"
                ]
            }
        ],
        "status": "OK"
    };
}
*/
