<template>
<div class="modal-rates">
  <div :class="['modal-rate', `modal-rate_type_${item.icon}`]" v-for="(item, index) in items" :key="index">
    <div class="modal-rate__wrap">
      <span class="modal-rate__label">{{ item.label }}</span>
      <span class="modal-rate__text">{{ item.text }}</span>
    </div>
  </div>
</div>
</template>

<script>

export default {

  name: 'ModalRates',

	data: () => ({
    items: [
      {
        label: 'Надежность',
        icon: '2',
        text: 'В этом блоке мы смотрим на наличие лицензии у оператора и ее репутацию (да, не все лицензии одинаково «полезны»), проверку генератора случайных чисел (или ее отсутствие), процедуру верификации личности, год основания бренда, публичную информацию о владельцах и отзывы игроков как на нашем сайте, так и на зарубежных форумах.'
      },
      {
        label: 'Бонусы и акции',
        icon: '11',
        text: 'Промо-акции — ключевой инструмент привлечения и удержания клиентов. А для игроков — дополнительная выгода в виде рейкбека и бонусов. Здесь учитываем структуру рейка, размер бонуса на депозит, его максимальный размер и рейкбек-велью. Также оцениваем регулярность и размах акций.'
      },
      {
        label: 'Выбор игры',
        icon: '13',
        text: 'Любому игроку важно, чтобы в руме была регулярная катка в любимую игру и на подходящих лимитах. В этой оценке мы учитываем суммарный кеш-трафик комнаты, кол-во представленных покерных дисциплин, лимитов, количество и разнообразие регулярных МТТ-турниров. Плюсом для рума будет наличие таких игр, как Омаха, Спины, Быстрый Покер, Шортдек, Хедз-ап.'
      },
      {
        label: 'Любители',
        icon: '6',
        text: 'Покер не был бы покером, если бы не соревновательный элемент и влияние скилла на результат. Мы выделяем слабость поля в отдельную оценку, основанную на результатах игры нашей команды (мы всегда тестируем покер-сайт сами перед добавлением его в рейтинг) и вин-рейтах наших игроков. Кроме того, принимаем во внимание правила экологии комнаты - ее отношение к PRO-игрокам, покерному софту, HUD, покерным трекерам, майнингу и бамханту.'
      },
      {
        label: 'Удобство софта',
        icon: '3',
        text: 'Если PRO-игроку в целом проще привыкнуть к не всегда безупречному программному обеспечению, то для новичков и хобби-игроков удобство клиента - едва ли не главный фактор. В этом разделе мы тестируем и оцениваем ПК и мобильные софты комнат, стабильность их работы и кол-во поддерживаемых платформ.'
      },
      {
        label: 'Депозиты и выводы',
        icon: '5',
        text: 'Возможность быстро, удобно и в нужных количествах выводить профит (или нажимать на кнопку «Депозит») сложно переоценить. Лучшие онлайн покер-румы создают максимально комфортные кассовые условия для своих клиентов. Игрок, который может ввести или вывести деньги в считанные часы остается доволен сервисом и лоялен оператору. Смотрим на кол-во поддерживаемых кошельков, скорость и лимиты вывода денег, комиссии на кешауты, наличие агентской кассы.'
      },
    ]
	}),
}
</script>

<style lang="scss">
$ico-score-2: url('~assets/i/room/ico-score-2.svg?data');
$ico-score-3: url('~assets/i/room/ico-score-3.svg?data');
$ico-score-5: url('~assets/i/room/ico-score-5.svg?data');
$ico-score-6: url('~assets/i/room/ico-score-6.svg?data');
$ico-score-11: url('~assets/i/room/ico-score-11.svg?data');
$ico-score-13: url('~assets/i/room/ico-score-13.svg?data');

.modal-rate {
  margin-bottom: 16px;
  padding-left: 36px;
  min-height: 20px;
  position: relative;
  &:before {
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &_type_2 {
    &:before {
      background-image: $ico-score-2;
    }
  }

  &_type_3 {
    &:before {
      background-image: $ico-score-3;
    }
  }

  &_type_5 {
    &:before {
      background-image: $ico-score-5;
    }
  }

  &_type_6 {
    &:before {
      background-image: $ico-score-6;
    }
  }

  &_type_11 {
    &:before {
      background-image: $ico-score-11;
    }
  }

  &_type_13 {
    &:before {
      background-image: $ico-score-13;
    }
  }

  &__label {
    margin-bottom: 12px;
    display: block;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.2px;
    color: #222222;
  }

  &__text {
    font-family: Proxima Nova;
    font-size: 17px;
    line-height: 21px;
    color: #3D3D3D;
  }
}
</style>