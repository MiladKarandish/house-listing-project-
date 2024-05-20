<template>
  <div class="page_content">
    <h1>About DTT Rael Estate</h1>
  <p>
    From a student room in 2010 to a full-service digital agency in the heart of Amsterdam. 
    Our story is one of those. A story we are very proud of. <br><br> 
    We - the over 50 enthusiastic strategists, 
    designers, developers and testers - who work together daily on the most beautiful projects. And we have 
    been doing this for small and large clients - from independent entrepreneurs, startups, the public sector
    and SMEs, to multinationals like Randstad and nonprofits like Greenpeace. <br><br>
    Clients with diverse objectives,
    target groups and resources, challenging us time and again to develop a suitable digital solution. 
    As a team, this makes us rich in experience, flexible and enormously versatile. And that is precisely
    where our strength lies.
  </p>
  <h1>Design and Developement</h1>
  <div class="content-web-link">
    <img src="@/assets/img_logo_dtt@3x.png" alt="">
    <div class="web-link">
      <h5 cless="web-link-item">By DTT</h5>
      <a href="www.d-tt.nl" cless="web-link-item">www.d-tt.nl</a>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'About_page', 
}
</script>

<style >
.page_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 0% 15%;
  font-family: Open Sans;
  font-size: 15px;
  color: #4A4B4C;
  font-weight: 300;
}

h1 {
  font-family: Montserrat;
  font-size: 32px;
  color: black;
  font-weight: 700;
}

img{
  height: 70px;
}

.content-web-link{
  display: flex;
}

.web-link{
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
}

h5{
  margin: 0px;
  font-size: 18px;
  color: black;
  font-weight: 300;

}

a{
  text-decoration: none;
  color: inherit;
  font-size: 15px;
  font-family: 'Montserrat';
  color: #067BC2;
  font-weight: 300;
}

</style>