<template>
  <b-container fluid>
    <h1>{{ $t('message1') }}</h1>
     <h3>{{ $t('message2') }}</h3>
     <h3>{{ $t('message3') }}</h3>
      <h3>{{ $t('message4') }}</h3>
       <h3>{{ $t('message5') }}</h3>
        <h3>{{ $t('message6') }}</h3>
    <footer>
      <p>
        {{ $t('message7') }}
      </p>
      <h3>
        {{ $t('message8') }}
      </h3>
    </footer>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>
