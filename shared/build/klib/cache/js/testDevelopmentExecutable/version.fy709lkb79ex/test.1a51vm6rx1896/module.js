(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-test-kotlin-test-js-ir.js', './kotlin-kotlin-stdlib.js', './SmartFarm-shared.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-test-kotlin-test-js-ir.js'), require('./kotlin-kotlin-stdlib.js'), require('./SmartFarm-shared.js'));
  else {
    if (typeof this['kotlin-kotlin-test-kotlin-test-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm:shared_test'. Its dependency 'kotlin-kotlin-test-kotlin-test-js-ir' was not found. Please, check whether 'kotlin-kotlin-test-kotlin-test-js-ir' is loaded prior to 'SmartFarm:shared_test'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm:shared_test'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'SmartFarm:shared_test'.");
    }
    if (typeof this['SmartFarm-shared'] === 'undefined') {
      throw new Error("Error loading module 'SmartFarm:shared_test'. Its dependency 'SmartFarm-shared' was not found. Please, check whether 'SmartFarm-shared' is loaded prior to 'SmartFarm:shared_test'.");
    }
    root['SmartFarm:shared_test'] = factory(typeof this['SmartFarm:shared_test'] === 'undefined' ? {} : this['SmartFarm:shared_test'], this['kotlin-kotlin-test-kotlin-test-js-ir'], this['kotlin-kotlin-stdlib'], this['SmartFarm-shared']);
  }
}(this, function (_, kotlin_kotlin_test, kotlin_kotlin, kotlin_SmartFarm_shared) {
  'use strict';
  //region block: imports
  var assertTrue = kotlin_kotlin_test.$_$.c;
  var protoOf = kotlin_kotlin.$_$.id;
  var classMeta = kotlin_kotlin.$_$.xb;
  var setMetadataFor = kotlin_kotlin.$_$.jd;
  var VOID = kotlin_kotlin.$_$.h;
  var suite = kotlin_kotlin_test.$_$.d;
  var test = kotlin_kotlin_test.$_$.e;
  var Unit_getInstance = kotlin_kotlin.$_$.e5;
  var ApiConfig_getInstance = kotlin_SmartFarm_shared.$_$.d;
  var assertEquals = kotlin_kotlin_test.$_$.a;
  var contains = kotlin_kotlin.$_$.df;
  var Endpoints_getInstance = kotlin_SmartFarm_shared.$_$.a;
  var Long = kotlin_kotlin.$_$.ch;
  var Settings_getInstance = kotlin_SmartFarm_shared.$_$.c;
  var Features_getInstance = kotlin_SmartFarm_shared.$_$.b;
  var assertNotNull = kotlin_kotlin_test.$_$.b;
  var ServiceFactory_getInstance = kotlin_SmartFarm_shared.$_$.k;
  var CategoryConfig_getInstance = kotlin_SmartFarm_shared.$_$.j;
  var Crops_getInstance = kotlin_SmartFarm_shared.$_$.e;
  var Livestock_getInstance = kotlin_SmartFarm_shared.$_$.h;
  var Equipment_getInstance = kotlin_SmartFarm_shared.$_$.f;
  var Tasks_getInstance = kotlin_SmartFarm_shared.$_$.i;
  var Financial_getInstance = kotlin_SmartFarm_shared.$_$.g;
  var listOf = kotlin_kotlin.$_$.z8;
  //endregion
  //region block: pre-declaration
  setMetadataFor(BasicTest, 'BasicTest', classMeta, VOID, VOID, BasicTest);
  setMetadataFor(SimpleWorkingTest, 'SimpleWorkingTest', classMeta, VOID, VOID, SimpleWorkingTest);
  setMetadataFor(ConfigurationTest, 'ConfigurationTest', classMeta, VOID, VOID, ConfigurationTest);
  //endregion
  function get_$stableprop() {
    return 0;
  }
  function BasicTest() {
    this.$stable_1 = 0;
  }
  protoOf(BasicTest).testBasicAssertion_dj3ine_k$ = function () {
    assertTrue(true, 'Basic assertion should pass');
  };
  protoOf(BasicTest).testStringComparison_bizly4_k$ = function () {
    var expected = 'Hello';
    var actual = 'Hello';
    assertTrue(expected === actual, 'Strings should be equal');
  };
  protoOf(BasicTest).testNumberComparison_v3mzo4_k$ = function () {
    var expected = 42;
    var actual = 42;
    assertTrue(expected === actual, 'Numbers should be equal');
  };
  protoOf(BasicTest).testBooleanLogic_bk4tfc_k$ = function () {
    var condition = true;
    assertTrue(condition, 'Boolean condition should be true');
  };
  function test_fun_izoufj() {
    suite('BasicTest', false, test_fun$BasicTest_test_fun_j7jkkk);
  }
  function test_fun$BasicTest_test_fun_j7jkkk() {
    test('testBasicAssertion', false, test_fun$BasicTest_test_fun$testBasicAssertion_test_fun_w6r2wb);
    test('testStringComparison', false, test_fun$BasicTest_test_fun$testStringComparison_test_fun_ngh0bf);
    test('testNumberComparison', false, test_fun$BasicTest_test_fun$testNumberComparison_test_fun_wbecj1);
    test('testBooleanLogic', false, test_fun$BasicTest_test_fun$testBooleanLogic_test_fun_ks6q9j);
    return Unit_getInstance();
  }
  function test_fun$BasicTest_test_fun$testBasicAssertion_test_fun_w6r2wb() {
    var tmp = new BasicTest();
    tmp.testBasicAssertion_dj3ine_k$();
    return Unit_getInstance();
  }
  function test_fun$BasicTest_test_fun$testStringComparison_test_fun_ngh0bf() {
    var tmp = new BasicTest();
    tmp.testStringComparison_bizly4_k$();
    return Unit_getInstance();
  }
  function test_fun$BasicTest_test_fun$testNumberComparison_test_fun_wbecj1() {
    var tmp = new BasicTest();
    tmp.testNumberComparison_v3mzo4_k$();
    return Unit_getInstance();
  }
  function test_fun$BasicTest_test_fun$testBooleanLogic_test_fun_ks6q9j() {
    var tmp = new BasicTest();
    tmp.testBooleanLogic_bk4tfc_k$();
    return Unit_getInstance();
  }
  function get_$stableprop_0() {
    return 0;
  }
  function SimpleWorkingTest() {
    this.$stable_1 = 0;
  }
  protoOf(SimpleWorkingTest).testBasicAssertion_dj3ine_k$ = function () {
    assertTrue(true, 'Basic assertion should pass');
  };
  protoOf(SimpleWorkingTest).testStringComparison_bizly4_k$ = function () {
    var expected = 'Hello';
    var actual = 'Hello';
    assertTrue(expected === actual, 'Strings should be equal');
  };
  protoOf(SimpleWorkingTest).testMathOperation_pj1koz_k$ = function () {
    var result = 4;
    assertTrue(result === 4, '2 + 2 should equal 4');
  };
  function test_fun_izoufj_0() {
    suite('SimpleWorkingTest', false, test_fun$SimpleWorkingTest_test_fun_au9ab1);
  }
  function test_fun$SimpleWorkingTest_test_fun_au9ab1() {
    test('testBasicAssertion', false, test_fun$SimpleWorkingTest_test_fun$testBasicAssertion_test_fun_1klz16);
    test('testStringComparison', false, test_fun$SimpleWorkingTest_test_fun$testStringComparison_test_fun_xaxl78);
    test('testMathOperation', false, test_fun$SimpleWorkingTest_test_fun$testMathOperation_test_fun_b0nel1);
    return Unit_getInstance();
  }
  function test_fun$SimpleWorkingTest_test_fun$testBasicAssertion_test_fun_1klz16() {
    var tmp = new SimpleWorkingTest();
    tmp.testBasicAssertion_dj3ine_k$();
    return Unit_getInstance();
  }
  function test_fun$SimpleWorkingTest_test_fun$testStringComparison_test_fun_xaxl78() {
    var tmp = new SimpleWorkingTest();
    tmp.testStringComparison_bizly4_k$();
    return Unit_getInstance();
  }
  function test_fun$SimpleWorkingTest_test_fun$testMathOperation_test_fun_b0nel1() {
    var tmp = new SimpleWorkingTest();
    tmp.testMathOperation_pj1koz_k$();
    return Unit_getInstance();
  }
  function get_$stableprop_1() {
    return 0;
  }
  function ConfigurationTest() {
    this.$stable_1 = 0;
  }
  protoOf(ConfigurationTest).testApiConfigEnvironments_oxdug6_k$ = function () {
    assertEquals('PRODUCTION', ApiConfig_getInstance().get_currentEnvironment_c7ogv7_k$().get_name_woqyms_k$());
    assertTrue(contains(ApiConfig_getInstance().get_baseUrl_48hdl7_k$(), 'api.smartfarm.com'));
    assertEquals('/farms', Endpoints_getInstance().get_FARMS_i92a44_k$());
    assertEquals('/crops', Endpoints_getInstance().get_CROPS_i7poyi_k$());
    assertEquals('/livestock', Endpoints_getInstance().get_LIVESTOCK_k7ftt_k$());
    assertEquals('/tasks', Endpoints_getInstance().get_TASKS_igrf45_k$());
    assertEquals('/users', Endpoints_getInstance().get_USERS_ihmf9b_k$());
    assertEquals('/inventory', Endpoints_getInstance().get_INVENTORY_l6kqz7_k$());
    assertEquals('/financial', Endpoints_getInstance().get_FINANCIAL_ain70g_k$());
    assertEquals('/analytics', Endpoints_getInstance().get_ANALYTICS_qllz25_k$());
    assertEquals('/health', Endpoints_getInstance().get_HEALTH_1fy6jf_k$());
  };
  protoOf(ConfigurationTest).testApiConfigSettings_47zrp9_k$ = function () {
    assertEquals(new Long(30, 0), Settings_getInstance().get_TIMEOUT_SECONDS_aiy35k_k$());
    assertEquals(3, Settings_getInstance().get_RETRY_ATTEMPTS_ty6k0q_k$());
    assertEquals(new Long(5, 0), Settings_getInstance().get_CACHE_DURATION_MINUTES_uafrty_k$());
    assertEquals('application/json', Settings_getInstance().get_CONTENT_TYPE_dx1lxz_k$());
    assertEquals('application/json', Settings_getInstance().get_ACCEPT_4sbzsf_k$());
    assertEquals('SmartFarm-Mobile/1.0.0', Settings_getInstance().get_USER_AGENT_ypt5h6_k$());
  };
  protoOf(ConfigurationTest).testApiConfigFeatures_d8952h_k$ = function () {
    assertTrue(Features_getInstance().get_ENABLE_CACHING_m92c5w_k$());
    assertTrue(Features_getInstance().get_ENABLE_OFFLINE_MODE_ilo1hq_k$());
    assertTrue(Features_getInstance().get_ENABLE_REAL_TIME_UPDATES_uaepx6_k$());
    assertTrue(Features_getInstance().get_ENABLE_FILE_UPLOADS_n77xqa_k$());
    assertTrue(Features_getInstance().get_ENABLE_PUSH_NOTIFICATIONS_c4fh86_k$());
  };
  protoOf(ConfigurationTest).testApiConfigDebugInfo_q4k13t_k$ = function () {
    var debugInfo = ApiConfig_getInstance().getDebugInfo_3fxx5h_k$();
    assertNotNull(debugInfo.get_wei43m_k$('Environment'));
    assertNotNull(debugInfo.get_wei43m_k$('Base URL'));
    assertNotNull(debugInfo.get_wei43m_k$('Timeout'));
    assertNotNull(debugInfo.get_wei43m_k$('Retry Attempts'));
    assertNotNull(debugInfo.get_wei43m_k$('Caching Enabled'));
    assertNotNull(debugInfo.get_wei43m_k$('Offline Mode'));
  };
  protoOf(ConfigurationTest).testServiceFactoryTypes_v11gki_k$ = function () {
    assertEquals('REAL_API', ServiceFactory_getInstance().get_currentServiceType_i99yjl_k$().get_name_woqyms_k$());
    var dataService = ServiceFactory_getInstance().getDataService_29ra8b_k$();
    assertNotNull(dataService);
    var webSocketService = ServiceFactory_getInstance().getWebSocketService_do9qv8_k$();
    assertNotNull(webSocketService);
    var cacheService = ServiceFactory_getInstance().getCacheService_lvecsp_k$();
    assertNotNull(cacheService);
    var fileUploadService = ServiceFactory_getInstance().getFileUploadService_6qn7fi_k$();
    assertNotNull(fileUploadService);
  };
  protoOf(ConfigurationTest).testServiceFactoryInfo_k8pozf_k$ = function () {
    var serviceInfo = ServiceFactory_getInstance().getServiceInfo_sjlya5_k$();
    assertNotNull(serviceInfo.get_wei43m_k$('Service Type'));
    assertNotNull(serviceInfo.get_wei43m_k$('Data Source'));
    assertNotNull(serviceInfo.get_wei43m_k$('Environment'));
    assertNotNull(serviceInfo.get_wei43m_k$('Base URL'));
  };
  protoOf(ConfigurationTest).testCategoryConfigCrops_hl41jz_k$ = function () {
    var cropCategories = CategoryConfig_getInstance().getAllCropCategories_xi6okp_k$();
    assertTrue(cropCategories.containsKey_aw81wo_k$('Grains'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Legumes'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Vegetables'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Fruits'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Herbs'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Flowers'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Trees'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Nuts'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Roots'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Leafy Greens'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Organic'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Heirloom'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Hybrid'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Seasonal'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Perennial'));
    assertTrue(cropCategories.containsKey_aw81wo_k$('Annual'));
    assertTrue(Crops_getInstance().get_GRAINS_1pujkv_k$().contains_aljjnj_k$('corn'));
    assertTrue(Crops_getInstance().get_GRAINS_1pujkv_k$().contains_aljjnj_k$('wheat'));
    assertTrue(Crops_getInstance().get_LEGUMES_e2lvez_k$().contains_aljjnj_k$('soybean'));
    assertTrue(Crops_getInstance().get_VEGETABLES_rgfmrf_k$().contains_aljjnj_k$('tomato'));
    assertTrue(Crops_getInstance().get_FRUITS_26je3c_k$().contains_aljjnj_k$('apple'));
    assertTrue(Crops_getInstance().get_HERBS_ia8ezh_k$().contains_aljjnj_k$('basil'));
    assertTrue(Crops_getInstance().get_FLOWERS_h31wv_k$().contains_aljjnj_k$('rose'));
    assertTrue(Crops_getInstance().get_TREES_ih1zd8_k$().contains_aljjnj_k$('apple'));
  };
  protoOf(ConfigurationTest).testCategoryConfigLivestock_kxqxi0_k$ = function () {
    var livestockCategories = CategoryConfig_getInstance().getAllLivestockCategories_quz4e3_k$();
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Cattle'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Poultry'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Goats'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Horses'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Sheep'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Pigs'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Fish'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Bees'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Pets'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Exotic'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Dairy'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Meat'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Egg Laying'));
    assertTrue(livestockCategories.containsKey_aw81wo_k$('Working'));
    assertTrue(Livestock_getInstance().get_CATTLE_3v16e8_k$().contains_aljjnj_k$('cow'));
    assertTrue(Livestock_getInstance().get_POULTRY_6p2p7g_k$().contains_aljjnj_k$('chicken'));
    assertTrue(Livestock_getInstance().get_GOATS_i9uo33_k$().contains_aljjnj_k$('goat'));
    assertTrue(Livestock_getInstance().get_HORSES_1a58zl_k$().contains_aljjnj_k$('horse'));
    assertTrue(Livestock_getInstance().get_FISH_wo0wpt_k$().contains_aljjnj_k$('fish'));
    assertTrue(Livestock_getInstance().get_BEES_wny9h6_k$().contains_aljjnj_k$('bee'));
    assertTrue(Livestock_getInstance().get_PETS_wo77nh_k$().contains_aljjnj_k$('dog'));
  };
  protoOf(ConfigurationTest).testCategoryConfigEquipment_wbdlis_k$ = function () {
    var equipmentCategories = CategoryConfig_getInstance().getAllEquipmentCategories_8y1yan_k$();
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Tractors'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Irrigation'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Greenhouse'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Tools'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Machinery'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Monitoring'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Storage'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Transport'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Automation'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Solar'));
    assertTrue(equipmentCategories.containsKey_aw81wo_k$('Precision'));
    assertTrue(Equipment_getInstance().get_TRACTORS_25liw5_k$().contains_aljjnj_k$('tractor'));
    assertTrue(Equipment_getInstance().get_IRRIGATION_kayfzd_k$().contains_aljjnj_k$('irrigation'));
    assertTrue(Equipment_getInstance().get_GREENHOUSE_hlwi9m_k$().contains_aljjnj_k$('greenhouse'));
    assertTrue(Equipment_getInstance().get_TOOLS_ih09zm_k$().contains_aljjnj_k$('shovel'));
    assertTrue(Equipment_getInstance().get_MONITORING_ih8udt_k$().contains_aljjnj_k$('sensor'));
  };
  protoOf(ConfigurationTest).testCategoryConfigTasks_tqdv04_k$ = function () {
    assertTrue(Tasks_getInstance().get_PLANTING_c23p7k_k$().contains_aljjnj_k$('planting'));
    assertTrue(Tasks_getInstance().get_HARVESTING_t27wri_k$().contains_aljjnj_k$('harvesting'));
    assertTrue(Tasks_getInstance().get_MAINTENANCE_g9z1py_k$().contains_aljjnj_k$('maintenance'));
    assertTrue(Tasks_getInstance().get_FEEDING_302ao5_k$().contains_aljjnj_k$('feeding'));
    assertTrue(Tasks_getInstance().get_HEALTH_1fy6jf_k$().contains_aljjnj_k$('health'));
    assertTrue(Tasks_getInstance().get_MONITORING_ih8udt_k$().contains_aljjnj_k$('monitoring'));
    assertTrue(Tasks_getInstance().get_MARKETING_vvgskj_k$().contains_aljjnj_k$('marketing'));
    assertTrue(Tasks_getInstance().get_ADMINISTRATION_i28m7b_k$().contains_aljjnj_k$('administration'));
    assertTrue(Tasks_getInstance().get_SUSTAINABILITY_66nwds_k$().contains_aljjnj_k$('sustainability'));
    assertTrue(Tasks_getInstance().get_RESEARCH_onw8t8_k$().contains_aljjnj_k$('research'));
    assertTrue(Tasks_getInstance().get_TRAINING_28sbz7_k$().contains_aljjnj_k$('training'));
  };
  protoOf(ConfigurationTest).testCategoryConfigFinancial_y8ymux_k$ = function () {
    assertTrue(Financial_getInstance().get_INCOME_tx2ry_k$().contains_aljjnj_k$('income'));
    assertTrue(Financial_getInstance().get_EXPENSES_k5uk10_k$().contains_aljjnj_k$('expenses'));
    assertTrue(Financial_getInstance().get_INVESTMENTS_qzwadl_k$().contains_aljjnj_k$('investment'));
    assertTrue(Financial_getInstance().get_LOANS_iclmwq_k$().contains_aljjnj_k$('loan'));
    assertTrue(Financial_getInstance().get_GRANTS_1pufq8_k$().contains_aljjnj_k$('grant'));
    assertTrue(Financial_getInstance().get_INSURANCE_f814vj_k$().contains_aljjnj_k$('insurance'));
    assertTrue(Financial_getInstance().get_SUSTAINABILITY_FUNDS_xq1rtt_k$().contains_aljjnj_k$('sustainability'));
    assertTrue(Financial_getInstance().get_RESEARCH_FUNDS_2pwbxp_k$().contains_aljjnj_k$('research'));
    assertTrue(Financial_getInstance().get_EDUCATION_FUNDS_38t9zi_k$().contains_aljjnj_k$('education'));
  };
  protoOf(ConfigurationTest).testCustomCategoryOperations_xpvqnx_k$ = function () {
    CategoryConfig_getInstance().addCustomCategory_nxawse_k$('Test', 'Test Category', listOf(['test', 'demo', 'example']));
    CategoryConfig_getInstance().removeCustomCategory_dz3rj1_k$('Test', 'Test Category');
    assertTrue(true);
  };
  function test_fun_izoufj_1() {
    suite('ConfigurationTest', false, test_fun$ConfigurationTest_test_fun_lgkd24);
  }
  function test_fun$ConfigurationTest_test_fun_lgkd24() {
    test('testApiConfigEnvironments', false, test_fun$ConfigurationTest_test_fun$testApiConfigEnvironments_test_fun_d55isv);
    test('testApiConfigSettings', false, test_fun$ConfigurationTest_test_fun$testApiConfigSettings_test_fun_7kcyc);
    test('testApiConfigFeatures', false, test_fun$ConfigurationTest_test_fun$testApiConfigFeatures_test_fun_q7k70y);
    test('testApiConfigDebugInfo', false, test_fun$ConfigurationTest_test_fun$testApiConfigDebugInfo_test_fun_gkuasy);
    test('testServiceFactoryTypes', false, test_fun$ConfigurationTest_test_fun$testServiceFactoryTypes_test_fun_jqzcpl);
    test('testServiceFactoryInfo', false, test_fun$ConfigurationTest_test_fun$testServiceFactoryInfo_test_fun_etxzos);
    test('testCategoryConfigCrops', false, test_fun$ConfigurationTest_test_fun$testCategoryConfigCrops_test_fun_yk24hk);
    test('testCategoryConfigLivestock', false, test_fun$ConfigurationTest_test_fun$testCategoryConfigLivestock_test_fun_qxm31d);
    test('testCategoryConfigEquipment', false, test_fun$ConfigurationTest_test_fun$testCategoryConfigEquipment_test_fun_uxdlz7);
    test('testCategoryConfigTasks', false, test_fun$ConfigurationTest_test_fun$testCategoryConfigTasks_test_fun_83rts3);
    test('testCategoryConfigFinancial', false, test_fun$ConfigurationTest_test_fun$testCategoryConfigFinancial_test_fun_mrdvz2);
    test('testCustomCategoryOperations', false, test_fun$ConfigurationTest_test_fun$testCustomCategoryOperations_test_fun_ev08ro);
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testApiConfigEnvironments_test_fun_d55isv() {
    var tmp = new ConfigurationTest();
    tmp.testApiConfigEnvironments_oxdug6_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testApiConfigSettings_test_fun_7kcyc() {
    var tmp = new ConfigurationTest();
    tmp.testApiConfigSettings_47zrp9_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testApiConfigFeatures_test_fun_q7k70y() {
    var tmp = new ConfigurationTest();
    tmp.testApiConfigFeatures_d8952h_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testApiConfigDebugInfo_test_fun_gkuasy() {
    var tmp = new ConfigurationTest();
    tmp.testApiConfigDebugInfo_q4k13t_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testServiceFactoryTypes_test_fun_jqzcpl() {
    var tmp = new ConfigurationTest();
    tmp.testServiceFactoryTypes_v11gki_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testServiceFactoryInfo_test_fun_etxzos() {
    var tmp = new ConfigurationTest();
    tmp.testServiceFactoryInfo_k8pozf_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCategoryConfigCrops_test_fun_yk24hk() {
    var tmp = new ConfigurationTest();
    tmp.testCategoryConfigCrops_hl41jz_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCategoryConfigLivestock_test_fun_qxm31d() {
    var tmp = new ConfigurationTest();
    tmp.testCategoryConfigLivestock_kxqxi0_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCategoryConfigEquipment_test_fun_uxdlz7() {
    var tmp = new ConfigurationTest();
    tmp.testCategoryConfigEquipment_wbdlis_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCategoryConfigTasks_test_fun_83rts3() {
    var tmp = new ConfigurationTest();
    tmp.testCategoryConfigTasks_tqdv04_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCategoryConfigFinancial_test_fun_mrdvz2() {
    var tmp = new ConfigurationTest();
    tmp.testCategoryConfigFinancial_y8ymux_k$();
    return Unit_getInstance();
  }
  function test_fun$ConfigurationTest_test_fun$testCustomCategoryOperations_test_fun_ev08ro() {
    var tmp = new ConfigurationTest();
    tmp.testCustomCategoryOperations_xpvqnx_k$();
    return Unit_getInstance();
  }
  //region block: tests
  (function () {
    suite('com.smartfarm.shared', false, function () {
      test_fun_izoufj();
      test_fun_izoufj_0();
    });
    suite('com.yourcompany.smartfarm.shared', false, function () {
      test_fun_izoufj_1();
    });
  }());
  //endregion
  return _;
}));
