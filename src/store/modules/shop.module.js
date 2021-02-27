import axios from '../../axios/shop'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      CARD_MODEL: {},
      products: [
        // { "id": "1", "count": 13, "title": "Яблоко", "category": "fruit", "price": 99, "img": "https://images.grocery.yandex.net/2783132/a14b43cfbbac4898b5a89fd1e52c0029/300x300.png" },
        // { "id": "2", "count": 15, "title": "Груша", "category": "fruit", "price":  159, "img": "https://images.grocery.yandex.net/2805921/631c3a283a994a80820c216ec51f139d/300x300.png" },
        // { "id": "3", "count": 14, "title": "Апельсин", "category": "fruit", "price":  149, "img": "https://stockmeier-food.ru/wp-content/uploads/2019/07/apelsin.jpg" },
        // { "id": "4", "count": 0, "title": "Нектарин", "category": "fruit", "price":  200, "img": "https://cdn-irec.r-99.com/sites/default/files/imagecache/300o/product-images/13250/1280575364_nectarin.jpg" },
        // { "id": "5", "count": 15, "title": "Огурец", "category": "vegetable", "price":  79, "img": "https://images.grocery.yandex.net/2750890/33686ff02aa44c7cb4bcb551b42f851a/300x300.png" },
        // { "id": "6", "count": 14, "title": "Помидоры", "category": "vegetable", "price":  129, "img": "https://images.grocery.yandex.net/2756334/e97aaa365384455c84dbfa3691c330f1/300x300.png" },
        // { "id": "7", "count": 11, "title": "Свекла", "category": "vegetable", "price":  19, "img": "https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png" },
        // { "id": "8", "count": 12, "title": "Баклажан", "category": "vegetable", "price":  189, "img": "https://images.grocery.yandex.net/2756334/cbb08819de08460a9131a86c627bed92/300x300.png" },
        // { "id": "9", "count": 14, "title": "Говядина", "category": "meat", "price":  519, "img": "https://images.grocery.yandex.net/2791769/01fa0c414a1d406da8db8f9a103f752d/300x300.png" },
        // { "id": "10", "count": 17, "title": "Свинина", "category": "meat", "price":  459, "img": "https://турмясово.рф/wp-content/uploads/2018/08/%D0%A4%D0%B8%D0%BB%D0%B5-%D1%81%D0%B2%D0%B8%D0%BD%D0%B8%D0%BD%D0%B0-300x300.jpg" },
        // { "id": "11", "count": 16, "title": "Утка", "category": "meat", "price":  890, "img": "https://myaso-1.ru/wp-content/uploads/2020/02/60588.jpg" },
        // { "id": "12", "count": 14, "title": "Курица", "category": "meat", "price":  190, "img": "https://produktoff.com/static/upload/goods/21/72421_original.jpg" },
        // { "id": "13", "count": 12, "title": "Форель", "category": "fish", "price":  299, "img": "https://images.grocery.yandex.net/2750890/c22be040fc034226aee10d52972db879/300x300.png" },
        // { "id": "14", "count": 0, "title": "Тунец", "category": "fish", "price":  159, "img": "https://images.grocery.yandex.net/2805921/76b31b25e00748b290a44c03e279440c/300x300.png" },
        // { "id": "15", "count": 13, "title": "Треска", "category": "fish", "price":  429, "img": "https://images.grocery.yandex.net/2805921/b4f8c7add9874804acfae734534e1409/300x300.png" },
        // { "id": "16", "count": 10, "title": "Белуга", "category": "fish", "price":  1200, "img": "https://olimp-fish.ru/wp-content/uploads/2020/04/%D1%84%D0%B8%D0%BB%D0%B5-%D1%82%D1%80%D0%B5%D1%81%D0%BA%D0%B8-300x300.jpg" },
        // { "id": "17", "count": 12, "title": "Розмарин", "category": "greens", "price":  169, "img": "https://images.grocery.yandex.net/2756334/09072b2d38ff4b9391f89a2b37a83053/300x300.png" },
        // { "id": "18", "count": 13, "title": "Шпинат", "category": "greens", "price":  69, "img": "https://images.grocery.yandex.net/2783132/1e72718cfd11452a8ed4ed04aee8c033/300x300.png" },
        // { "id": "19", "count": 13, "title": "Петрушка", "category": "greens", "price":  39, "img": "https://images.grocery.yandex.net/2756334/6f87c8ecea5b4fb98601b901cbcf0b6f/300x300.png" },
        // { "id": "20", "count": 14, "title": "Укроп", "category": "greens", "price":  35, "img": "https://images.grocery.yandex.net/2805921/a00ffda9ddca4defa055fd4e6719f4c7/300x300.png" },
        // { "id": "21", "count": 11, "title": "Мята", "category": "greens", "price":  99, "img": "https://images.grocery.yandex.net/2998515/dc4c4582962e48589147b830c30cebe8/300x300.png" },
        // { "id": "22", "count": 15, "title": "Кинза", "category": "greens", "price":  55, "img": "https://images.grocery.yandex.net/2888787/0fd625d240034c8282faff2b4ea677e3/300x300.png" },
        // { "id": "23", "count": 10, "title": "Клубника", "category": "berries", "price":  299, "img": "https://images.grocery.yandex.net/2805921/af2033d4ef3b4645abd19cd21e408695/300x300.png" },
        // { "id": "24", "count": 10, "title": "Голубика", "category": "berries", "price":  249, "img": "https://images.grocery.yandex.net/2756334/569d8814c1e548b0b4945e7bc4cd912a/300x300.png" },
        // { "id": "25", "count": 15, "title": "Виноград", "category": "berries", "price":  139, "img": "https://images.grocery.yandex.net/2783132/4e13bf22837b45b59fd4b3e611d5fedf/300x300.png" }
      ],
      category: [
                  // {"type": "fruit", "title": "Фрукты", "id": "1"},
                  // {"type": "vegetable", "title": "Овощи", "id": "2"},
                  // {"type": "meat", "title": "Мясо", "id": "3"},
                  // {"type": "fish", "title": "Рыба", "id": "4"},
                  // {"type": "greens", "title": "Зелень", "id": "5"},
                  // {"type": "berries", "title": "Ягоды", "id": "6"}
                ]
    }
  },
  getters: {
    CARD_MODEL(state) {
      return state.CARD_MODEL
    },
    products(state) {
      return state.products
    },
    category(state) {
      return state.category
    },
    getCountCARD_MODEL(state){
      return Object.keys(state.CARD_MODEL).length
    }
  },

  mutations: {
    setCARD_MODEL(state, CARD_MODEL) {
      state.CARD_MODEL = CARD_MODEL
    },
    setProduct(state, products) {
      state.products = products
    },

    setCategory(state, category) {
      state.category = category
    },
    
    delProduct(state, product) {
      const requiredIndex = state.products.findIndex(el => {
        return  String(el.id) === String(product.id);
      });
      if(requiredIndex === -1){
          return false;
      };
      state.products.splice(requiredIndex, 1);
    },

    

    updateProduct(state, product) {     
      for (var i = 0; i < state.products.length; i++) {
        if (state.products[i] === product.id) {
          state.products[i].title = product.title,
          state.products[i].img = product.img,
          state.products[i].price = product.price,
          state.products[i].count = product.count,
          state.products[i].category = product.category
        }
      }

    },

    delCategory(state, category) {
      const requiredIndex = state.category.findIndex(el => {
        return  String(el.id) === String(category.id);
      });
      if(requiredIndex === -1){
          return false;
      };
      state.category.splice(requiredIndex, 1);
    },
    
    addCategory(state, category) {
      state.category.push(category)
    },

    addProduct(state, product) {
      state.products.push(product)
    },
    
  },
  actions: {
    async actionSetCARD_MODEL({ commit }, payload) {
      commit('setCARD_MODEL', payload)
    },
    // async actionSetProducts({ commit }, payload) {

    //   commit('setProduct', payload)
    // },

    async actionUpdateProducts({ commit }, payload) {
      try {
        const token = store.getters['auth/token']
        await axios.put(`/product/${payload.id}.json?auth=${token}`, payload)
        commit('updateProduct', payload)
      } catch(e){

      }      
    },
    async actionDelCategory({ commit }, payload) {
      const token = store.getters['auth/token']
      await axios.delete(`/category/${payload.id}.json?auth=${token}`)
      commit('delCategory', payload)
    },
    async actionDelProducts({ commit }, payload) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/product/${payload.id}.json?auth=${token}`)
        commit('delProduct', payload)
      } catch(e){

      }      
    },
    async actionAddCategory({ commit }, payload) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/category.json?auth=${token}`, payload)
        commit('addCategory', {...payload, id: data.name})
        
      } catch (e) {
        
      }
    },
    async actionAddProduct({ commit }, payload) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/product.json?auth=${token}`, payload)
        commit('addProduct', {...payload, id: data.name})
      } catch (e) {
        
      }
    },
    async loadCategory({ commit }) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/category.json`)
        const category = Object.keys(data).map(id => ({...data[id], id}))
        //console.log(category);
        commit('setCategory', category)
      } catch (e) {

      }
    },
    async loadProduct({ commit }) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/product.json`)
        const product = Object.keys(data).map(id => ({...data[id], id}))
        //console.log(product);
        commit('setProduct', product)
      } catch (e) {

      }
    },

    async loadAll(){
      const products = [
        { "id": "1", "count": 13, "title": "Яблоко", "category": "fruit", "price": 99, "img": "https://images.grocery.yandex.net/2783132/a14b43cfbbac4898b5a89fd1e52c0029/300x300.png" },
        { "id": "2", "count": 15, "title": "Груша", "category": "fruit", "price":  159, "img": "https://images.grocery.yandex.net/2805921/631c3a283a994a80820c216ec51f139d/300x300.png" },
        { "id": "3", "count": 14, "title": "Апельсин", "category": "fruit", "price":  149, "img": "https://stockmeier-food.ru/wp-content/uploads/2019/07/apelsin.jpg" },
        { "id": "4", "count": 0, "title": "Нектарин", "category": "fruit", "price":  200, "img": "https://cdn-irec.r-99.com/sites/default/files/imagecache/300o/product-images/13250/1280575364_nectarin.jpg" },
        { "id": "5", "count": 15, "title": "Огурец", "category": "vegetable", "price":  79, "img": "https://images.grocery.yandex.net/2750890/33686ff02aa44c7cb4bcb551b42f851a/300x300.png" },
        { "id": "6", "count": 14, "title": "Помидоры", "category": "vegetable", "price":  129, "img": "https://images.grocery.yandex.net/2756334/e97aaa365384455c84dbfa3691c330f1/300x300.png" },
        { "id": "7", "count": 11, "title": "Свекла", "category": "vegetable", "price":  19, "img": "https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png" },
        { "id": "8", "count": 12, "title": "Баклажан", "category": "vegetable", "price":  189, "img": "https://images.grocery.yandex.net/2756334/cbb08819de08460a9131a86c627bed92/300x300.png" },
        { "id": "9", "count": 14, "title": "Говядина", "category": "meat", "price":  519, "img": "https://images.grocery.yandex.net/2791769/01fa0c414a1d406da8db8f9a103f752d/300x300.png" },
        { "id": "10", "count": 17, "title": "Свинина", "category": "meat", "price":  459, "img": "https://турмясово.рф/wp-content/uploads/2018/08/%D0%A4%D0%B8%D0%BB%D0%B5-%D1%81%D0%B2%D0%B8%D0%BD%D0%B8%D0%BD%D0%B0-300x300.jpg" },
        { "id": "11", "count": 16, "title": "Утка", "category": "meat", "price":  890, "img": "https://myaso-1.ru/wp-content/uploads/2020/02/60588.jpg" },
        { "id": "12", "count": 14, "title": "Курица", "category": "meat", "price":  190, "img": "https://produktoff.com/static/upload/goods/21/72421_original.jpg" },
        { "id": "13", "count": 12, "title": "Форель", "category": "fish", "price":  299, "img": "https://images.grocery.yandex.net/2750890/c22be040fc034226aee10d52972db879/300x300.png" },
        { "id": "14", "count": 0, "title": "Тунец", "category": "fish", "price":  159, "img": "https://images.grocery.yandex.net/2805921/76b31b25e00748b290a44c03e279440c/300x300.png" },
        { "id": "15", "count": 13, "title": "Треска", "category": "fish", "price":  429, "img": "https://images.grocery.yandex.net/2805921/b4f8c7add9874804acfae734534e1409/300x300.png" },
        { "id": "16", "count": 10, "title": "Белуга", "category": "fish", "price":  1200, "img": "https://olimp-fish.ru/wp-content/uploads/2020/04/%D1%84%D0%B8%D0%BB%D0%B5-%D1%82%D1%80%D0%B5%D1%81%D0%BA%D0%B8-300x300.jpg" },
        { "id": "17", "count": 12, "title": "Розмарин", "category": "greens", "price":  169, "img": "https://images.grocery.yandex.net/2756334/09072b2d38ff4b9391f89a2b37a83053/300x300.png" },
        { "id": "18", "count": 13, "title": "Шпинат", "category": "greens", "price":  69, "img": "https://images.grocery.yandex.net/2783132/1e72718cfd11452a8ed4ed04aee8c033/300x300.png" },
        { "id": "19", "count": 13, "title": "Петрушка", "category": "greens", "price":  39, "img": "https://images.grocery.yandex.net/2756334/6f87c8ecea5b4fb98601b901cbcf0b6f/300x300.png" },
        { "id": "20", "count": 14, "title": "Укроп", "category": "greens", "price":  35, "img": "https://images.grocery.yandex.net/2805921/a00ffda9ddca4defa055fd4e6719f4c7/300x300.png" },
        { "id": "21", "count": 11, "title": "Мята", "category": "greens", "price":  99, "img": "https://images.grocery.yandex.net/2998515/dc4c4582962e48589147b830c30cebe8/300x300.png" },
        { "id": "22", "count": 15, "title": "Кинза", "category": "greens", "price":  55, "img": "https://images.grocery.yandex.net/2888787/0fd625d240034c8282faff2b4ea677e3/300x300.png" },
        { "id": "23", "count": 10, "title": "Клубника", "category": "berries", "price":  299, "img": "https://images.grocery.yandex.net/2805921/af2033d4ef3b4645abd19cd21e408695/300x300.png" },
        { "id": "24", "count": 10, "title": "Голубика", "category": "berries", "price":  249, "img": "https://images.grocery.yandex.net/2756334/569d8814c1e548b0b4945e7bc4cd912a/300x300.png" },
        { "id": "25", "count": 15, "title": "Виноград", "category": "berries", "price":  139, "img": "https://images.grocery.yandex.net/2783132/4e13bf22837b45b59fd4b3e611d5fedf/300x300.png" }
      ] 

      const token = store.getters['auth/token']
      products.forEach(element => {
        console.log(element);
        axios.post(`/product.json?auth=${token}`, element)
      })
    },
////////////////////////////////////////////////// 
////////////////////////////////////////////////// 
////////////////////////////////////////////////// 

    async create({ commit, dispatch }, payload) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
        commit('addRequest', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Заявка успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async load({ commit, dispatch }) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests.json?auth=${token}`)
        const requests = Object.keys(data).map(id => ({...data[id], id}))
        commit('setRequests', requests)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ commit, dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async remove({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('setMessage', {
          value: 'Заявка удалена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({ dispatch }, request) {
      try {
        //debugger
        const token = store.getters['auth/token']
        await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
        //debugger
        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },


}