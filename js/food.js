check()

function check() {
  let token = localStorage.getItem('token')
  if (token) {
    $('#login').show()
    $('#signinMethod').hide()
    $('#started').show()
    $('#logout').show()
  } else {
    $('#login').hide()
    $('#signinMethod').show()
    $('#started').hide()
    $('#logout').hide()
  }
}

getCategories()
  .then(response => {
    response.forEach( item => {
      $('#categories-nav').append(`<li><a href="#">${item.categories.name}</a></li>`)
    })
  })

  getEstablishments()
  .then(response => {
    response.forEach( item => {
      $('#cuisines-nav').append(`<li><a href="#">${item.establishment.name}</a></li>`)
    })
  })

getRestaurants()
  .then(response => {
    response.forEach( item => {
      $('#restaurants-card').append(`
      <div class="col-sm-3 col-sm-3 col-xs-12">
        <div class="card card-block">
          <a href="#map" onclick= "pointer(${item.restaurant.location.latitude}, ${item.restaurant.location.longitude})"><img alt="" src="${item.restaurant.thumb}">
            <div class="portfolio-over">
              <div>
                <h3 class="card-title">
                  ${item.restaurant.name}
                </h3>
                
                <p class="card-text">
                  ${item.restaurant.location.address}
                </p>
                <p class="card-text">
                  Categories: ${item.restaurant.cuisines}
                </p>

              </div>
            </div></a>
        </div>
      </div>
      `)
    })
  })

    $('#search-form').keydown(function () {
      if ($('#search-form').val().length > 3) {
        $('#restaurants-card').empty()
        getRestaurants($('#search-form').val())
          .then(response => {
            response.forEach( item => {
              $('#restaurants-card').append(`
              <div class="col-sm-3 col-sm-3 col-xs-12">
                <div class="card card-block">
                <a href="#map" onclick= "pointer(${item.restaurant.location.latitude}, ${item.restaurant.location.longitude})"><img alt="" src="${item.restaurant.thumb}">
                <div class="portfolio-over">
                      <div>
                        <h3 class="card-title">
                          ${item.restaurant.name}
                        </h3>
                        
                        <p class="card-text">
                          ${item.restaurant.location.address}
                        </p>
                        <p class="card-text">
                          Categories: ${item.restaurant.cuisines}
                        </p>
                      </div>
                    </div></a>
                </div>
              </div>
              `)
            })
          })
      }
    })

async function getData () {
  let dataAll = []
  let categories = await getCategories();
  let cuisines = await getCuisines();
  let establishments = await getEstablishments();
  dataAll.concat(categories.categories);
  categories.forEach(item => {
    dataAll.push(item)
  })
  cuisines.forEach(item => {
    dataAll.push(item)
  })
  establishments.forEach(item => {
    dataAll.push(item)
  })
  return dataAll
}

async function getCategories() {
  try {
    let categories = await $.get({
      url: 'http://localhost:3000/food/categories'
    })
    return categories.categories;
  } catch (error) {
    console.log(error);
  }
}

async function getCollections() {
  try {
    let collections = await $.get({
      url: 'http://localhost:3000/food/collections'
    })
    return collections.collections;
  } catch (error) {
    console.log(error);
  }
}

async function getCuisines() {
  try {
    let cuisines = await $.get({
      url: 'http://localhost:3000/food/cuisines'
    })
    return cuisines.cuisines;
  } catch (error) {
    console.log(error);
  }
}

async function getEstablishments() {
  try {
    let establishments = await $.get({
      url: 'http://localhost:3000/food/establishments'
    })
    return establishments.establishments;
  } catch (error) {
    console.log(error);
  }
}

async function getRestaurants(params) {
  try {
    if (params) {
      params = `q=${params}`
    } else {
      params = null
    }
    console.log(params);
    
    let restaurants = await $.get({
      url: `http://localhost:3000/food/search?${params}`
    })
    return restaurants.restaurants
  } catch (error) {
    console.log(error);
    
  }
}
