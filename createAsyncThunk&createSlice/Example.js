// POINT [createAsyncThunk]非同期処理のステータスを画面に表示
import Counter from "./components/Counter";
import { Provider } from "react-redux";
// import store from "./store"
import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";

//非同期処理用の関数。０～1秒後に引数の値を返すだけ。
//createAsyncThunkにthunkされる関数
//これの戻り値がextraReducersのaction.payloadに渡される
const asyncCount = (count = 1) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: count }), Math.random() * 1000)
  );
};

//ActionCreator
//createAsyncThunkはActioCreatorを返す関数
const addAsyncWithStatus = createAsyncThunk(
  'counter/asyncCount',
  async (payload) => {
    const response = await asyncCount(payload);
    return response.data;
  }
)

//ActionCreator
//createAsyncThunk2つめ。中身は同じ。
const addAsyncWithStatus2 = createAsyncThunk(
  'test/asyncCount',
  async (payload) => {
    const response = await asyncCount(payload);
    return response.data;
  }
)

/**Reducer＆Action＆Stateの生成
 * createSliceはReducerとActionCreatorとStateを含むオブジェクトを返す
 */
const counter = createSlice({
  name: 'counter',//これがtypeの一部になる
  initialState: {//Stateの初期値
    count: 0,
    status: ''
  },
  //reducersには同期処理
  reducers: {
    add(state, { type, payload }) {
      state.count = state.count + payload;
    },
    minus(state, { type, payload }) {
      state.count = state.count - payload;
    }
  },
  //extraReducersには非同期処理
  extraReducers: (builder) => {
    builder.addCase(addAsyncWithStatus.pending, (state) => {
      state.status = 'Loading...'
    })
      .addCase(addAsyncWithStatus.fulfilled, (state, action) => {
        state.status = '取得済'
        state.count = state.count + action.payload;
      })
      .addCase(addAsyncWithStatus.rejected, (state) => {
        state.status = 'エラー'
      })
  }
});

//Reducer＆Action＆Stateの生成
//2つ目のcreateSlice
const testSlice = createSlice({
  name: 'test',//これがtypeの一部
  initialState: {
    result: 1,
    status2: ''
  },
  reducers: {
    multiplication(state, { type, payload }) {
      state.result = state.result * payload;
    },
    division(state, { type, payload }) {
      state.result = state.result / payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addAsyncWithStatus2.pending, (state) => {
      state.status2 = "処理中";
    })
      .addCase(addAsyncWithStatus2.fulfilled, (state, action) => {
        state.status2 = "成功";
        state.result = state.result * action.payload;
      })
      .addCase(addAsyncWithStatus2.rejected, (state) => {
        state.status2 = "失敗";
      })
  }
});

//Store生成
const store =  configureStore({
  reducer: {
    counter: counter.reducer,//counter.reducerにReducerが入っている
    test: testSlice.reducer//testSlice.reducerにReducerが入っている
  }
});


// actionsにActionCreatorが入っている
// typeが　counter/add　counter/minus
const { add, minus } = counter.actions;

// typeが test/multiplication　test/division
const { multiplication, division } = testSlice.actions;


const Example = () => {
  return (
    <Provider store={store}>
      <Counter actionCreator1={add} actionCreator2={minus} actionCreator3={addAsyncWithStatus}
        actionCreator4={multiplication} actionCreator5={division} actionCreator6={addAsyncWithStatus2} />
    </Provider>
  );
};

export default Example;
