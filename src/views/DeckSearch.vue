<template>
  <div class="container" ref="start">
    <h3>{{ $t('message10') }}</h3>
    <form>
      <input type="text" v-model="search" refs="bake" />
      <br />
      <button class="bg-transparent" type="submit" @click.prevent="get">{{ $t('button3') }}</button>
    </form>
    <br />

    <b-container fluid>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="6th February 2021"
            text="Crazy tempo, fun and fast"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAea5AxiVzQPUyAPH3QPz4wPM0gOdwgKLugO0xAL+0QOHugPYuwPHxgPX3gPwwgLV3gPdzAP04wOczQOTzQPM3QOqsgLivgPr9gLv1QMD6uEDueED28wDAA==`"
            :photoUrl="img1"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Paladin"
            title="Paladin"
            date="17th March 2021"
            text="Hammer of the Naaru..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAZ8FFtj+At0K374D/geR5AOz3gP63gP+0QPK4wOl9QLK0QORswL03wOz3AP6AY3hA/AD2cICuuED4r4D28wD6L4DBMrDAuH+AqzCAoXeAwA=`"
            :photoUrl="img2"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="1st April 2021"
            text="No spells, No problem."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQcWq9QDh78CkQaS0AOVzQPizAOfzQP6BfPeA8bDAorQA6e%2BAvnoA5boA9m%2BA%2BS%2BA7m%2FAr2YA9zbA%2BrhA%2Bi%2BA4zUAwSnzgOonwTy6QPV8QMA`"
            :photoUrl="img3"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="09th April 2021"
            text="Too fast, too furius..."
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="arr"
            :photoUrl="img1"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Shaman"
            title="Shaman"
            date="14th April 2021"
            text="Kill em all"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array2"
            :photoUrl="img5"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="28th April 2021"
            text="by Mortician, with love..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQcY4swDh78Cn58EwZgDmZQD8J4D3b4DjaAE+bwCz78CkKAE++gD8ukD/+cD2b4D5L4D6uED5b4Dh5oD6L4D5uEDoJ4Dq9QDtIoEA7y5A4ygBI7tAwA=`"
            :photoUrl="img6"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Shaman"
            title="Shaman"
            date="9th May 2021"
            text="Keymaster Alabaster..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAaoIForkA97EAt++A9e+A5HkA/sBioADtuEDt6wDx+ED/58E5r4DlrkDmeoDodED/p8E+58Ek80D5b4D4r4D9t0DrZEDBP2fBJi5A4zUA9i+AwA=`"
            :photoUrl="img7"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="25th May 2021"
            text="Grommash + Ysera = Flawless"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQca4swD174DmO0DtJEDtt4D/tEDx+EDjgXWvgPmvgPcD/kM8t4Dju0DS+3pA0SM1APImAOcuwPYvgPm4QPSAqzUA6CeA7SKBAK8uQO13gMA`"
            :photoUrl="img8"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="5th june 2021"
            text="You... are not, PREPARED"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAea5AxrH3QPC8QOtoASQ5AOBEO/pA5jqA4+gBIfoApHoA9XeA73tA/TfA4fUA9HNA8ndA/XoA4GfBO7pA5PNA9vMA9nGA6XvA4CFBO/VA/O7AwKv7wO64QMA`"
            :photoUrl="img9"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Priest"
            title="Priest"
            date="6th july 2021"
            text="It's time to pray"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAa0GGLC6A5QPtuEDvdMCku4Dw8wD/tEDr7oDx+ED6boD8wzy6QPj0QPy3gOEnwSQEPCfBIoQmqAE5b4D28wD6NAC/N8DrNQDA5kQuuED+t8DAA==`"
            :photoUrl="img10"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Druid"
            title="Druid"
            date="21st july 2021"
            text="Summer time whipping"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAZICHpWgBLegBIrkA5jSAqTvA4/kA7AQ174DpKAEgRC57APH4QPkugPcoAShnwTy6QOz3AOboASmnwTY5QKAENHhApLNA7rhA5kQvuwD7boDrNQD3uwDlOADAAA=`"
            :photoUrl="img11"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warlock"
            title="Warlock"
            date="04th Oct 2021"
            text="You face Jaraxxus eredar lord of the burning legion"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAf0GHLi0BLGfBIP7A8P5A+egBK+nA8n5A5LuA4jvA6vsA+3hA+/tA8j5A/LtA4r0A5boA4H7A/jjA+DxA8/5A+3pA+bhA7/sAtiJA4OgBNn5A4WgBPHpAwGS3gMA`"
            :photoUrl="img12"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="10th Oct 2021"
            text="Crazy Tempo"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array3"
            :photoUrl="img13"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warlock"
            title="Warlock"
            date="15th Oct 2021"
            text="Crazy Tempo once again "
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array4"
            :photoUrl="img14"
          />
        </b-col>
        <b-col> 
          <TwelveWins
            heroClass="Priest-Mage"
            title="Priest Mage"
            date="07th Nov 2021"
            text="Time may pass but the dream is eternal!"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array5"
            :photoUrl="img15"
          />
        </b-col>
      </b-row>
      <b-row>
        <hr />
      </b-row>
      <section ref="trolompoukis">
        <b-row>
          <b-container v-if="loaded">
            <h2>{{ hero.name }}</h2>
            <h4>Format: {{ format.toUpperCase() }}</h4>

            <b-container fluid class="p-4">
              <b-img v-for="(card, index) in sortFunc()" :key="index" :src="card.image" :alt="card.name" height="414" width="300" />
            </b-container>

            <b-row>
              <b-button class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'" @click="close"> Hide Deck </b-button>
            </b-row>
            <b-row>
              <hr />
            </b-row>
            <b-row>
              <hr />
            </b-row>
          </b-container>
        </b-row>
      </section>
    </b-container>
    <hr />
  </div>
</template>

<script>
import axios from 'axios';
import TwelveWins from '../components/TwelveWins.vue';
import { mapState } from 'vuex';

export default {
  name: 'DeckSearch',
  components: { TwelveWins },
  data() {
    return {
      search: '',
      cards: [],
      deckCode: '',
      hero: {},
      format: '',
      loaded: false,
      array1: [
        59394,
        61127,
        57182,
        61939,
        52866,
        58495,
        56820,
        56820,
        59259,
        56391,
        59914,
        61273,
        61133,
        63726,
        62585,
        62482,
        69716,
        56860,
        62548,
        62548,
        62548,
        40289,
        52418,
        61129,
        61674,
        59027,
        61132,
        61626,
        57176,
        58455
      ],
      array2: [
        62442,
        61226,
        60043,
        52935,
        62703,
        58790,
        57174,
        62481,
        56411,
        56411,
        56411,
        69725,
        61224,
        61227,
        57177,
        60979,
        62745,
        63508,
        59553,
        63380,
        52278,
        69899,
        57180,
        40700,
        68333,
        59916,
        61670,
        51722,
        61629,
        61629
      ],
      arr: [
        72250,
        72248,
        63520,
        63058,
        63464,
        63407,
        63073,
        63515,
        63230,
        63632,
        63502,
        63432,
        63102,
        62921,
        63099,
        63398,
        63397,
        63396,
        63400,
        63375,
        63374,
        63373,
        63370,
        63369,
        63368,
        63098,
        63359,
        63358,
        63357,
        63347,
        63346,
        63335,
        63334,
        63332,
        63331,
        63329,
        63264,
        43453,
        66872,
        66870,
        66869,
        66868,
        66866,
        66864,
        66863,
        66862,
        66861,
        66860,
        66858,
        66856,
        66854,
        66259,
        66176,
        64467,
        64465,
        64464,
        62698,
        62498,
        62497,
        62490,
        62463,
        62462,
        62442,
        62359,
        62350,
        62349,
        62347,
        69991,
        69744,
        69743,
        69742,
        69741,
        69740,
        69738,
        69737,
        69736,
        69735,
        69734,
        69732,
        69731,
        69729,
        69728,
        69727,
        69726,
        69725,
        69724,
        69723,
        69722,
        69721,
        69720,
        69719,
        69718,
        69717,
        69716,
        69715,
        69714,
        69713,
        69712,
        69711,
        69710,
        69708,
        69707,
        69706,
        69705,
        69704,
        69703,
        69702,
        69701,
        69700,
        69699,
        69698,
        69697,
        69696,
        69695,
        69694,
        69693,
        69692,
        69691,
        69690,
        69689,
        69688,
        69687,
        69686,
        69685,
        69684,
        69683,
        69682,
        69681,
        69680,
        69679,
        69678,
        69677,
        69676,
        69675,
        69674,
        69673,
        69672,
        69671,
        69670,
        69669,
        69668,
        69667,
        69666,
        69665,
        69664,
        69663,
        69662,
        69661,
        69660,
        69659,
        69658,
        69657,
        69656,
        69655,
        69654,
        69653,
        69652,
        69651,
        69650,
        69649,
        69648,
        69647,
        69645,
        69644,
        69643,
        69642,
        69641,
        69640,
        69639,
        69638,
        69637,
        69636,
        69635,
        69634,
        69633,
        69632,
        69631,
        69630,
        69629,
        69628,
        69627,
        69626,
        69625,
        69624,
        69623,
        69622,
        69621,
        69620,
        69619,
        69618,
        69617,
        69616,
        69615,
        69614,
        69613,
        69612,
        69611,
        69610,
        69609,
        69608,
        69607,
        69606,
        69605,
        69604,
        69603,
        69602,
        69601,
        69600,
        69599,
        69598,
        69597,
        69596,
        69595,
        69594,
        69593,
        69591,
        69590,
        69588,
        69586,
        69569,
        69567,
        69566,
        69565,
        69558,
        69557,
        69556,
        69554,
        69553,
        69551,
        69550,
        69549,
        69548,
        69547,
        69546,
        69545,
        69544,
        69543,
        69542,
        69539,
        69537,
        69536,
        69535,
        69534,
        69533,
        69532,
        69530,
        69529,
        69528,
        69527,
        69526,
        69525,
        69524,
        69522,
        69521,
        69520,
        69519,
        69517,
        69516,
        69515,
        69513,
        69511,
        69509,
        69508,
        69507,
        69506,
        69505,
        69504,
        69503,
        69502,
        69501,
        69500,
        58455,
        2233,
        43494,
        2077,
        43474,
        2012,
        43473,
        2044,
        2053,
        1932,
        56900,
        2021,
        43469,
        2082,
        63726,
        63701,
        63690,
        63682,
        63591,
        63553,
        63517,
        63509,
        63508,
        63467,
        63461,
        63381,
        63380,
        63323,
        63279,
        63277,
        63274,
        63272,
        63261,
        63260,
        63252,
        63251,
        63250,
        63229,
        63227,
        63220,
        63219,
        63218,
        63217,
        63216,
        63215,
        63211,
        63195,
        63193,
        63192,
        63191,
        63188,
        63167,
        63166,
        63165,
        63164,
        63163,
        63130,
        63128,
        63126,
        63125,
        63124,
        63119,
        63118,
        63117,
        63114,
        63112,
        63088,
        63079,
        63074,
        63072,
        63071,
        63070,
        63069,
        63065,
        63064,
        63062,
        63060,
        63059,
        63057,
        63056,
        63042,
        63040,
        63038,
        63033,
        63030,
        63029,
        63027,
        63021,
        63019,
        63010,
        63007,
        63002,
        62993,
        62976,
        62947,
        62933,
        62927,
        62926,
        62924,
        62895,
        62894,
        62893,
        62892,
        62891,
        62890,
        62889,
        62888,
        62887,
        62879,
        62878,
        62877,
        62876,
        62875,
        62874,
        62873,
        62872,
        62871,
        62845,
        62813,
        62812,
        62811,
        62804,
        62750,
        62745,
        62744,
        62706,
        62705,
        62703,
        62702,
        62701,
        1991,
        62588,
        62587,
        62586,
        62585,
        62584,
        62583,
        62582,
        62581,
        62550,
        62549,
        62548,
        62515,
        62486,
        62485,
        62484,
        62483,
        62482,
        62481,
        62176,
        62049,
        61973,
        61972,
        61971,
        61970,
        61969,
        61968,
        61967,
        61966,
        61965,
        61964,
        61963,
        61962,
        61961,
        61960,
        61959,
        61958,
        61957,
        61956,
        61955,
        61954,
        61953,
        61952,
        61951,
        61950,
        61949,
        61948,
        61947,
        61946,
        61945,
        61944,
        61943,
        61942,
        61941,
        61940,
        61939,
        61898,
        61885,
        61884,
        61846,
        61842,
        61839,
        61702,
        61700,
        61699,
        61690,
        61685,
        61683,
        61682,
        61679,
        61677,
        61676,
        61674,
        61672,
        61670,
        61663,
        61649,
        61648,
        61646,
        61643,
        61642,
        61640,
        61639,
        61635,
        61629,
        61626,
        61625,
        61622,
        61620,
        61616,
        61606,
        61605,
        61604,
        61602,
        61589,
        61587,
        61585,
        61584,
        61581,
        61580,
        61503,
        61462,
        61461,
        61460,
        61450,
        61449,
        61437,
        61436,
        61435,
        61434,
        61428,
        61426,
        61308,
        61306,
        61305,
        61299,
        61298,
        61297,
        61291,
        61283,
        61282,
        61273,
        61271,
        61269,
        61268,
        61263,
        61262,
        61254,
        61252,
        61249,
        61248,
        61246,
        61242,
        61238,
        61237,
        61235,
        61230,
        61229,
        61228,
        61227,
        61226,
        61225,
        61224,
        61223,
        61222,
        61218,
        61208,
        61207,
        61206,
        61205,
        61203,
        61202,
        61192,
        61191,
        61189,
        61188,
        61187,
        61186,
        61180,
        61179,
        61178,
        61177,
        61176,
        61174,
        61171,
        61169,
        61168,
        61162,
        61159,
        61157,
        61156,
        61154,
        61151,
        61137,
        61136,
        61135,
        61133,
        61132,
        61131,
        61130,
        61129,
        61128,
        61127,
        61125,
        61123,
        60979,
        60926,
        60916,
        60892,
        60445,
        60443,
        58170,
        60280,
        60278,
        58770,
        60164,
        60153,
        60151,
        60143,
        60090,
        60043,
        60023,
        60016,
        60004,
        60003,
        59989,
        59963,
        59948,
        59947,
        59918,
        59916,
        59914,
        59911,
        59877,
        59869,
        59864,
        59753,
        59732,
        59727,
        59726,
        59725,
        59724,
        59720,
        59705,
        59703,
        59694,
        59691,
        59690,
        59658,
        59646,
        59643,
        59639,
        59628,
        59627,
        59623,
        59621,
        59619,
        59616,
        59614,
        59609,
        59606,
        59605,
        59602,
        59601,
        59599,
        59595,
        59594,
        59590,
        59587,
        59585,
        59584,
        59583,
        59579,
        59576,
        59572,
        59569,
        59558,
        59556,
        59555,
        59553,
        59542,
        59540,
        59539,
        59457,
        59456,
        59452,
        59450,
        59449,
        59411,
        59410,
        59409,
        59408,
        59403,
        59402,
        59400,
        59395,
        59394,
        59263,
        59259,
        59253,
        59252,
        59233,
        59230,
        59223,
        59222,
        59221,
        59216,
        59214,
        59213,
        59207,
        59192,
        59188,
        59175,
        59170,
        59164,
        59163,
        59151,
        59101,
        59092,
        59089,
        59083,
        59039,
        59038,
        59036,
        59035,
        59029,
        59027,
        59026,
        59013,
        59002,
        59001,
        59000,
        58980,
        58979,
        58978,
        58977,
        58976,
        58975,
        58974,
        58973,
        58972,
        58971,
        58947,
        58931,
        58796,
        58794,
        58791,
        58790,
        58782,
        58549,
        58495,
        58453,
        58243,
        58202,
        58201,
        57979,
        57950,
        57907,
        57721,
        57718,
        57688,
        57619,
        57546,
        57476,
        57326,
        57217,
        57197,
        57195,
        57194,
        57193,
        57192,
        57191,
        57190,
        57189,
        57188,
        57187,
        57186,
        57184,
        57183,
        57182,
        57181,
        57180,
        57177,
        57176,
        57175,
        57174,
        57166,
        57165,
        57160,
        57149,
        57145,
        56985,
        56899,
        56860,
        56827,
        56824,
        56823,
        56820,
        56819,
        56758,
        56734,
        56732,
        56717,
        56703,
        56697,
        56694,
        56689,
        56687,
        56686,
        56685,
        56684,
        56681,
        56682,
        56680,
        56678,
        56677,
        56676,
        56660,
        56649,
        56632,
        56624,
        56623,
        56622,
        56603,
        56598,
        56595,
        56556,
        56555,
        56554,
        56534,
        56530,
        56528,
        56527,
        56526,
        56524,
        56523,
        56520,
        56519,
        56516,
        56512,
        56511,
        56510,
        56508,
        56507,
        56504,
        56502,
        56501,
        56484,
        56483,
        56482,
        56472,
        56471,
        56470,
        56467,
        56461,
        56460,
        56451,
        56445,
        56444,
        56443,
        56439,
        56420,
        56417,
        56413,
        56412,
        56411,
        56398,
        56394,
        56393,
        56392,
        56391,
        56389,
        56387,
        56386,
        56385,
        56379,
        56378,
        56377,
        2029,
        2045,
        2027,
        2042,
        1940,
        2051,
        2055,
        1936,
        2062,
        2064,
        2093,
        2013,
        1995,
        2249,
        1935,
        2065,
        1938,
        2038,
        2010,
        1934,
        2032,
        1937,
        2066,
        1939,
        2054,
        2234,
        2047,
        2094,
        1941,
        2095,
        2058,
        2028,
        2069,
        2040,
        1982,
        2078,
        2039,
        2016,
        1997,
        2009,
        2075,
        1927,
        2061,
        2225,
        2079,
        2024,
        2081,
        2043,
        2073,
        2018,
        1931,
        2052,
        2063,
        2036,
        1928,
        2060,
        2007,
        2096,
        2085,
        2015,
        1998,
        1986,
        2067,
        2002,
        2041,
        2086,
        2011,
        1929,
        2035,
        2071,
        1988,
        2023,
        2017,
        2025,
        2004,
        1989,
        1985,
        2006,
        2005,
        2048,
        2026,
        2087,
        2001,
        2049,
        2088,
        2068,
        1992,
        2059,
        1933,
        2037,
        2057,
        1993,
        2019,
        2020,
        2056,
        2034,
        2022,
        2080,
        2033,
        2072,
        1990,
        2074,
        2084,
        2008,
        2031,
        2014,
        43369,
        2030,
        45528,
        2076,
        47035,
        43359,
        46892,
        45546,
        46589,
        46541,
        46557,
        45537,
        46551,
        46544,
        45195,
        43517,
        45784,
        43493,
        46499,
        46495,
        45535,
        43373,
        46461,
        46460,
        46454,
        46450,
        46449,
        46445,
        46442,
        46440,
        45269,
        46432,
        46403,
        46390,
        43489,
        43465,
        43507,
        45594,
        43407,
        43363,
        45271,
        2172,
        46307,
        46305,
        46303,
        46299,
        46296,
        43304,
        43121,
        46286,
        43288,
        46263,
        46258,
        43382,
        2083,
        2070,
        2046,
        2050,
        45929,
        43526,
        43357,
        43483,
        43515,
        43414,
        43486,
        43424,
        43420,
        45590,
        45828,
        46118,
        46067,
        43284,
        46087,
        43523,
        45837,
        45707,
        43463,
        46079,
        45287,
        43358,
        43322,
        43277,
        46027,
        46040,
        43294,
        45520,
        43112,
        43528,
        45936,
        45979,
        46107,
        45539,
        45905,
        46088,
        46082,
        45945,
        46077,
        43269,
        46069,
        45775,
        43384,
        45782,
        46058,
        46056,
        45547,
        45519,
        43329,
        46032,
        46031,
        46026,
        43133,
        43272,
        45820,
        43128,
        43345,
        46007,
        45995,
        43331,
        45988,
        43426,
        43122,
        45877,
        45529,
        2003,
        45531,
        45859,
        43282,
        45263,
        45899,
        45759,
        45265,
        45930,
        43237,
        43228,
        43485,
        45353,
        45835,
        45833
      ],
      array3: [
        63682,
        64372,
        61131,
        61297,
        64707,
        64707,
        68468,
        64713,
        72250,
        61898,
        69507,
        69504,
        63407,
        69680,
        62481,
        64712,
        62548,
        61129,
        61129,
        61129,
        64714,
        62581,
        50412,
        62701,
        64702,
        61626,
        63397,
        64716,
        64716,
        54272
      ],
      array4: [
        63369,
        54730,
        54429,
        50002,
        53882,
        64707,
        64707,
        64707,
        53970,
        64713,
        61622,
        69536,
        50083,
        63368,
        61677,
        69734,
        61941,
        53883,
        69725,
        48110,
        49066,
        61674,
        64719,
        64895,
        69658,
        69520,
        66259,
        54267,
        66864,
        54272
      ],
      array5: [
        57184,
        69509,
        64707,
        64008,
        52935,
        64713,
        64713,
        41176,
        41245,
        56603,
        42992,
        69606,
        69716,
        40921,
        69721,
        64709,
        64704,
        42442,
        52285,
        40378,
        64702,
        64711,
        57186,
        57186,
        52487,
        69674,
        42790,
        64716,
        64716,
        66868
      ]
    };
  },
  methods: {
    focusOnCardList() {
      this.$refs.trolompoukis.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    },
    focusOnTopOfPage() {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    },
    close() {
      this.loaded = !this.loaded;
      this.focusOnTopOfPage();
    },
    get() {
      const token = this.$store.state.oauth.accessToken;
      const code = this.search;
      if (code != '') {
        axios
          .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=en_US&code=${code}&access_token=${token}`)
          .then(res => {
            this.loaded = !this.loaded;
            this.cards = res.data.cards;
            this.deckCode = res.data.deckCode;
            this.hero = res.data.hero;
            this.format = res.data.format;
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was an error retrieving your deck ' + error.message
            };
            this.$store.dispatch('addNotification', notification, { root: true });
            throw error;
          });
      }
    },
    getMyDeck(deck) {
      const token = this.$store.state.oauth.accessToken;
      const lang = this.$store.state.lang;
      axios
        .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=${lang}&code=${deck}&access_token=${token}`)
        .then(res => {
          this.loaded = !this.loaded;
          this.cards = res.data.cards;
          this.deckCode = res.data.deckCode;
          this.hero = res.data.hero;
          this.format = res.data.format;
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was an error retrieving your deck ' + error.message
          };
          this.$store.dispatch('addNotification', notification, { root: true });
          throw error;
        });
      if (this.loaded == false) {
        this.focusOnCardList();
      } else this.focusOnTopOfPage();
    },
    sortFunc: function() {
      return this.cards.slice().sort(function(a, b) {
        return a.manaCost > b.manaCost ? 1 : -1;
      });
    },
    getDeckWithTriples(deck) {
      const token = this.$store.state.oauth.accessToken;
      const lang = this.$store.state.lang;
      let deckCards = [];
      if (this.loaded == true) {
        this.focusOnCardList();
      } else
        for (let i = 0; i <= deck.length - 1; i++) {
          axios
            .get(`https://us.api.blizzard.com/hearthstone/cards/${deck[i]}?locale=${lang}&access_token=${token}`)
            .then(res => {
              deckCards.push(res.data);
            })
            .catch(error => {
              const notification = {
                type: 'error',
                message: 'There was an error retrieving your deck ' + error.message
              };
              this.$store.dispatch('addNotification', notification, { root: true });
              throw error;
            })
            .then(() => {
              this.focusOnCardList();
            });
        }

      this.loaded = !this.loaded;
      this.cards = deckCards;
      this.deckCode = 'No cade due to triplets';
      this.hero.name = name;
      this.format = 'Wild';
      if (this.loaded == false) {
        this.focusOnCardList();
      } else this.focusOnTopOfPage();
    }
  },
  computed: {
    ...mapState({ theme: state => state.theme }),
    isDark() {
      if (this.theme == 'dark') {
        return true;
      } else return false;
    },
    img1() {
      return require('../assets/images/Capture1.jpg');
    },
    img2() {
      return require('../assets/images/paladin1.jpg');
    },
    img3() {
      return require('../assets/images/tseris2.jpg');
    },
    img4() {
      return require('../assets/images/napo1.jpg');
    },
    img5() {
      return require('../assets/images/Shaman1.jpg');
    },
    img6() {
      return require('../assets/images/tseris-warrior-1.jpg');
    },
    img7() {
      return require('../assets/images/napo-shaman1.jpg');
    },
    img8() {
      return require('../assets/images/warriorFlawless1.jpg');
    },
    img9() {
      return require('../assets/images/demonHunter1.jpg');
    },
    img10() {
      return require('../assets/images/priest1.jpg');
    },
    img11() {
      return require('../assets/images/druid-napo1.jpg');
    },
    img12() {
      return require('../assets/images/warlock1.jpg');
    },
    img13() {
      return require('../assets/images/Napo_DH1.jpg');
    },
    img14() {
      return require('../assets/images/warlockNapo1.jpg');
    },
    img15() {
      return require('../assets/images/priest_mage1.jpeg')
    }
  }
};
</script>
<style scoped>
.zoom:hover {
  transform: scale(1.5);
}
</style>
