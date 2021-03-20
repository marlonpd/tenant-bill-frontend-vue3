<template>
  <div class="container">
    <nav>
      <ul>
        <li class="active"><i class="fa fa-bicycle"></i></li>
        <li><i class="fa fa-car"></i></li>
        <li><i class="fa fa-train"></i></li>
        <li><i class="fa fa-plane"></i></li>
      </ul>
    </nav>
    <article>
      <h1>Bicycle</h1>
      <p>
        Bicycles were introduced in the 19th century in Europe and as of 2003,
        more than 1 billion have been produced worldwide, twice as many as the
        number of automobiles that have been produced. They are the principal
        means of transportation in many regions. They also provide a popular
        form of recreation, and have been adapted for use as children's toys,
        general fitness, military and police applications, courier services, and
        bicycle racing.
      </p>
    </article>
    <article>
      <h1>Car</h1>
      <p>
        The year 1886 is regarded as the birth year of the modern car, when
        German inventor Karl Benz built the Benz Patent-Motorwagen. Cars did not
        become widely available until the early 20th century. One of the first
        cars that was accessible to the masses was the 1908 Model T, an American
        car manufactured by the Ford Motor Company. Cars were rapidly adopted in
        the United States, but took much longer to be accepted in Western Europe
        and other parts of the world.
      </p>
    </article>
    <article>
      <h1>Train</h1>
      <p>
        The first trains were rope-hauled, gravity powered or pulled by horses.
        From the early 19th century almost all were powered by steam
        locomotives. From the 1910s onwards the steam locomotives began to be
        replaced by less labor-intensive and cleaner (but more complex and
        expensive) diesel and electric locomotives, while at about the same time
        self-propelled multiple unit vehicles of either power system became much
        more common in passenger service.
      </p>
    </article>
    <article>
      <h1>Plane</h1>
      <p>
        The Wright brothers invented and flew the first airplane in 1903,
        recognized as "the first sustained and controlled heavier-than-air
        powered flight". They built on the works of George Cayley dating from
        1799, who set forth the concept of the modern airplane. Airplanes had a
        presence in all the major battles of World War II. They were an
        essential component of the military strategies of the period, such as
        the American and Japanese aircraft carrier campaigns of the Pacific War.
      </p>
    </article>
  </div>
  <p class="attribution">
    Information sourced from
    <a href="https://www.wikipedia.org/" target="_blank">Wikipedia</a>
  </p>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HomePage',
    components: {},
  });
</script>

<style lang="scss" scoped>
  body {
    background: #38444f;
    font-family: Catamaran, sans-serif;
    font-size: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-weight: 400;
  }

  p {
    font-weight: 400;
    line-height: 1.4em;
  }

  a {
    color: #7c8893;
    text-decoration: none;

    &:hover {
      color: #8d9a04;
    }
  }

  .attribution {
    color: #6b7782;
  }

  .container {
    background: #f1f1f1;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    margin: auto;
    overflow: hidden;
    width: 520px;
  }

  nav,
  ul {
    background: #4c4c4c;
    margin: 0;
    padding: 0;
  }

  li {
    background: #3c3c3c;
    border-top: solid 1px #3c3c3c;
    border-bottom: solid 1px #3c3c3c;
    color: #000;
    display: flex;
    height: 80px;
    width: 80px;
    transition: all 0.2s ease;

    &.active {
      background: #4d4d4d;
      border-color: #fff;
      color: #fff;
    }

    i.fa {
      font-size: 1.6em;
      margin: auto;
    }

    &:hover {
      background: #4d4d4d;
      cursor: pointer;
    }
  }

  article + article {
    display: none;
  }

  article {
    background: #f1f1f1;
    padding: 0 2em;
    width: 100%;
  }
</style>
