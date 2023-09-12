<script>

    import $ from 'jquery'

    export default{
        name: 'AjaxMethod',

        data(){
            return {

                //----------權限資訊-------------------------------
                
                // API回傳的statusCode / information
                statusCode: '',
                information: '',
                docDetail: '',

                diffDay: '',
                trafficAccidentCount: '',

                environmentalFriendlyStatus: '',
                healthSafetyStatus: '',
                workerSafety: '',
                occupationalDisaster:'',

                versionTag: '',
                versionList: [],
               
            }
        },
       
        methods: {

            ajaxGetMethodPromise: function(apiUrl, mode){

                return new Promise((resolve) => {

                    var self = this
                    $.ajax({
                        url: apiUrl,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        type: 'get',
                        headers:{"Access-Control-Allow-Origin":"*",
                                "Access-Control-Allow-Methods":"*",
                                "Access-Control-Allow-Headers":"*",
                                "Access-Control-Allow-Credentials":"true",
                                "Content-Type":"application/json"},
                        success: function(data){
                            if (mode == 'environmentalFriendly'){
                                self.environmentalFriendlyStatus = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"environmentalFriendlyStatus": self.environmentalFriendlyStatus,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }                
                            else if (mode == 'HealthSafety'){
                                self.healthSafetyStatus = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"healthSafetyStatus": self.healthSafetyStatus,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }      
                            else if (mode == 'Get worksafe happend days'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']
                                self.diffDay = data['diffDay']

                                self.passApiInformation = {"diffDay":self.diffDay,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'Get traffic accident days'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']
                                self.trafficAccidentCount = data['trafficAccidentCount']

                                self.passApiInformation = {"trafficAccidentCount":self.trafficAccidentCount,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);

                            }
                            else if (mode == 'WorkerSafety'){
                                self.workerSafety = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"workerSafety": self.workerSafety,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }        
                            else if (mode == 'update Enviromental LinePie'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'OccupationalDisaster'){
                                self.occupationalDisaster = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"occupationalDisaster": self.occupationalDisaster,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);

                            }
                            else if (mode == 'get Limit Logic Version'){
                                self.versionTag = data['nowVersion']
                                self.versionList = data['listVersin']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"versionTag": self.versionTag,
                                                            "versionList": self.versionList,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);

                            }
                              
                        },    
                        error: function(data){
                            
                            self.passApiInformation = {"statusCode": 400,
                                                        "statuinformationsCode": '伺服器連線異常'};

                            resolve(self.passApiInformation);

                        }
                    })
                    
                });

            },    

            ajaxPostMethodPromise: function(apiUrl, mode, passParameterToApiModel){

                return new Promise((resolve) => {

                    var self = this
                    $.ajax({
                        url: apiUrl,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        data: JSON.stringify(passParameterToApiModel),
                        type: 'post',
                        headers:{"Access-Control-Allow-Origin":"*",
                                "Access-Control-Allow-Methods":"*",
                                "Access-Control-Allow-Headers":"*",
                                "Access-Control-Allow-Credentials":"true",
                                "Content-Type":"application/json"},
                        success: function(data){     
                            if (mode == 'sendExcelValue'){
                                self.excelValue = data['excelValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"excelValue": self.excelValue,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'add'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'delete'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'edit'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'userLogin'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'WorkerSafety'){
                                self.workerSafety = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"workerSafety": self.workerSafety,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }     
                            else if (mode == 'workSafeMenu'){
                                self.workerSafety = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"workSafeMenu": self.workerSafety,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }        
                            else if (mode == 'userLogin'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'getWorkSafeMenuDetail'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']
                                self.docDetail = data['docDetail']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information,
                                                            "docDetail": self.docDetail};

                                resolve(self.passApiInformation);
                            }
                            else if (mode == 'occupationalDisasterMenu'){
                                self.occupationalDisasterMenu = data['dbValue']
                                self.statusCode = data['statusCode']
                                self.information = data['information']

                                self.passApiInformation = {"occupationalDisasterMenu": self.occupationalDisasterMenu,
                                                            "statusCode": self.statusCode,
                                                            "information": self.information};

                                resolve(self.passApiInformation);
                            }     
                            else if (mode == 'occupationalDisasterMenuDetailURL'){
                                self.statusCode = data['statusCode']
                                self.information = data['information']
                                self.docDetail = data['docDetail']

                                self.passApiInformation = {"statusCode": self.statusCode,
                                                            "information": self.information,
                                                            "docDetail": self.docDetail};

                                resolve(self.passApiInformation);
                            }

                            
                        },    
                        error: function(data){
                            
                            self.passApiInformation = {"statusCode": 400,
                                                        "information": 'Excel檔案異常'};

                            resolve(self.passApiInformation);

                        }
                    })
                    
                });

            },   
        }
    }
</script>
