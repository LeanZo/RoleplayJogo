"use strict";
var DiceBox;
var RollDice;

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 40 + 'px';
    var label = $t.id('label');
    var set = $t.id('set');
    var selector_div = $t.id('selector_div');
    var info_div = $t.id('info_div');
    on_set_change();

    $t.dice.use_true_random = false;

    function on_set_change(ev) { set.style.width = set.value.length + 3 + 'ex'; }
    $t.bind(set, 'keyup', on_set_change);
    $t.bind(set, 'mousedown', function(ev) { ev.stopPropagation(); });
    $t.bind(set, 'mouseup', function (ev) { if (!DraggingElement) { ev.stopPropagation(); } });
    $t.bind(set, 'focus', function(ev) { $t.set(container, { class: '' }); });
    $t.bind(set, 'blur', function(ev) { $t.set(container, { class: 'noselect' }); });

    $t.bind($t.id('clear'), ['mouseup', 'touchend'], function (ev) {
        if (!DraggingElement) {
            ev.stopPropagation();
            set.value = '0';
            on_set_change();
        }
    });

    var params = $t.get_url_params();

    $t.dice.desk_color = 0xf8f0e9;

    if (params.chromakey) {
        $t.dice.desk_color = 0x00ff00;
        info_div.style.display = 'none';
    }
    if (params.shadows == 0) {
        $t.dice.use_shadows = false;
    }

    $t.dice.dice_color = '#900808';
    $t.dice.label_color = '#f8f0e9';

    if (params.color == 'white') {
    }

    DiceBox = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
    DiceBox.animate_selector = false;

    $t.bind(window, 'resize', function() {
        canvas.style.width = window.innerWidth - 1 + 'px';
        canvas.style.height = window.innerHeight - 40 + 'px';
        DiceBox.reinit(canvas, { w: 500, h: 300 });
    });

    function show_selector() {
        info_div.style.display = 'none';
        selector_div.style.display = 'block';
        DiceBox.draw_selector();
    }

    function before_roll(vectors, notation, callback) {
        info_div.style.display = 'none';
        selector_div.style.display = 'none';
        // do here rpc call or whatever to get your own result of throw.
        // then callback with array of your result, example:
        // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
        callback(notation);
    }

    function notation_getter(notation) {
        if(notation == null)
            return $t.dice.parse_notation(set.value);
        else
            return $t.dice.parse_notation(notation);
    }

    function after_roll(notation, result) {
        if (params.chromakey || params.noresult) return;
        var res = result.join(' ');
        if (notation.constant) {
            if (notation.constant > 0) res += ' +' + notation.constant;
            else res += ' -' + Math.abs(notation.constant);
        }
        if (result.length > 1) res += ' = ' + 
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
        label.innerHTML = res;
        info_div.style.display = 'block';
    }

    DiceBox.bind_mouse(container, notation_getter, before_roll, after_roll);
    DiceBox.bind_throw($t.id('throw'), notation_getter, before_roll, after_roll);

    RollDice = function (starter, notation) {
        DiceBox.start_throw(function () { return notation_getter(notation) }, before_roll, after_roll);

        if (starter) {
            while (!DiceBox.check_if_throw_finished()) {
                ++DiceBox.iteration;
                var frame_rate = 1 / 60;
                DiceBox.world.step(frame_rate);
            }

            var values = DiceBox.getDiceValues(DiceBox.dices);
            notation = set.value;

            if (!notation.includes('@')) notation = notation + ' @ ' + values.toString().replaceAll(',', ' ');

            try {
                //DiceHub.server.rollDice(notation);
                DiceHub.invoke("rollDice", notation);
            } catch (e) {
                console.log('Erro ao rolar dado: ' + e);
            }
        }
    }

    $t.bind(container, ['mouseup', 'touchend'], function (ev) {
        if (!DraggingElement) {
            ev.stopPropagation();
            if (selector_div.style.display == 'none') {
                if (!DiceBox.rolling) show_selector();
                DiceBox.rolling = false;
                return;
            }
            var name = DiceBox.search_dice_by_mouse(ev);
            if (name != undefined) {
                var notation = $t.dice.parse_notation(set.value);
                notation.set.push(name);
                set.value = $t.dice.stringify_notation(notation);
                on_set_change();
            }
        }
    });

    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event($t.id('throw'), 'mouseup');
    }
    else {
        show_selector();
    }
}
