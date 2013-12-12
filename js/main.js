calcModel = Backbone.Model.extend({
});

calcCollection = Backbone.Collection.extend({
})


view = Backbone.View.extend({
    events:{
        'click .js-submit__btn': 'submit',
        'change select[name=cable_mark]': 'changeCableMark',
        'change select[name=baraban]': 'changeBarabanMark',
        'click .js-show-additional_data': 'showAdditionalData',
        'change input[name=without_baraban]': 'toggleBaraban',
        'blur input[name=metrs]': 'metrsBlur',
        'focus input[name=metrs]': 'metrsFocus'
    },
    initialize: function(){
        
        var initial_elements = [];
        _.each(_.uniq(_.pluck(calcDB, "mark_id")), function(el){
          var bool = true;
          _.each(calcDB, function(all_el){
             if(all_el.mark_id==el && bool){initial_elements.push(all_el); bool= false;}
          })
        });

        var selectHTML = "";
        _.each(initial_elements, function(el){
            selectHTML +='<option value="' + el.mark_id + '">' + el.mark + '</option>'
        });
        this.$('select[name=cable_mark]').html(selectHTML);
        this.$('select[name=cable_mark]:first').prop('selected', true);

        this.$('select[name=cable_mark]').val(calcDB[0].mark_id);

        var cable_type = this.$('select[name=cable_mark]').val(),
            baraban_type = this.$('select[name=baraban]').val();
        this.collection = new calcCollection();
        this.collection.add(calcDB);
        this.render();
        this.filtered_cable = calcDB.filter(function(type){return type.mark_id == cable_type });
        this.filtered_barabans = barabansDB.filter(function(type){return type.id == baraban_type })[0];
        this.changeCableMark();
        this.changeBarabanMark();
        this.$('.js-chosen').chosen({disable_search_threshold: 5});
        this.$('.js-chosen[name=cable_mark]').data().chosen.search_field.attr('placeholder', 'введите первые буквы марки')
    },
    metrsBlur: function(){
        if( this.$('input[name=metrs]').val()==""){
            this.$('input[name=metrs]').val(0);
        }
    },
    metrsFocus: function(){
        if( this.$('input[name=metrs]').val()=="0"){
            this.$('input[name=metrs]').val("");
        }
    },
    toggleBaraban: function(){
        if(this.$('input[name=without_baraban]').prop('checked')){
            this.$("select[name=baraban]").chosen('destroy');
            this.$("select[name=baraban]").attr("disabled", "disabled");
            this.$("select[name=baraban]").chosen();
        } else {
            this.$("select[name=baraban]").chosen('destroy');
            this.$("select[name=baraban]").removeAttr('disabled');            
            this.$("select[name=baraban]").chosen();
        }
    },
    showAdditionalData: function(){
        this.$('.additional_data').toggle(200);
    },
    changeCableMark: function(e){ 
        var cable_type = this.$('select[name=cable_mark]').val(),
            that = this;
        this.filtered_cable = calcDB.filter(function(type){return type.mark_id == cable_type });
        //достаем из массива только нужные нам марки
        this.$('select[name=sechenie]').html('');
        $.each(this.filtered_cable, function(val, el){
            that.$('select[name=sechenie]').append('<option value="' + el.id + '">' + el.sechenie + '</option>');             
        });
        this.$('select[name=sechenie]').chosen('destroy');
        this.$('select[name=sechenie]').chosen({disable_search_threshold: 5});
    },
    changeBarabanMark: function(){
        debugger;
        var baraban_type = this.$('select[name=baraban]').val(),
            that = this;
        this.filtered_barabans = barabansDB.filter(function(type){return type.id == baraban_type })[0];
        this.$('input[name=lengthsheiki]').val(this.filtered_barabans.length_sheiki);
        this.$('input[name=diametrscheki]').val(this.filtered_barabans.diametr_scheki);
        this.$('input[name=diametrsheiki]').val(this.filtered_barabans.diametr_sheiki);
        this.$('input[name=obembarabana]').val(this.filtered_barabans.obem_barabana);
        this.$('input[name=vesbarabana]').val(this.filtered_barabans.ves_barabana);
    },
    render: function(){
        var that = this;
        this.$('select[name=baraban], select[name=sechenie]').html('');
        $.each(barabansDB, function(val,el){
            that.$('select[name=baraban]').append('<option value="' + el.id + '">' + el.baraban_num + '</option>')
        });
    },
    calculate: function(){
        var result = 0,
            that = this,
            lenght_kabelya = this.$('input[name=metrs]').val(),
            lengthsheiki = parseInt(this.$('input[name=lengthsheiki]').val())/1000,
            diametrscheki = parseInt(this.$('input[name=diametrscheki]').val())/1000,
            diametrsheiki = parseInt(this.$('input[name=diametrsheiki]').val())/1000,
            diametr = parseFloat(this.filtered_cable.filter(function(type){
                return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
            })[0].diametr)/1000,
            vesKabelya = parseFloat(this.filtered_cable.filter(function(type){
                return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
            })[0].massa),
            nomer_barabana = this.$('select[name=baraban] option:selected').html(),
            without_baraban = this.$('input[name=without_baraban]').prop('checked'),
            cable_mark = '',
            obshiy_ves = 0,
            additionl_result = '';
        /*
        Для (допустим) NYM 2х2,5 в количестве Х на барабане № Y необходимо: столько то барабанов, общий объем такой-то, общий вес такой-то
        */
        /*this.$('#result h1').html("Полная длинна кабеля(L) = " + result + "<br> Количество барабанов = " + result_barabans);
        this.$('#result h1').append("<br>Сумма объемов этих барабанов: " + (result_barabans * this.filtered_barabans.obem_barabana) );
        this.$('#result h1').append("<br>Общий вес барабанов: " + (result_barabans * this.filtered_barabans.ves_barabana) );
        this.$('#result h1').append("<br>Вес кабеля намотанного на барабаны: " + (lenght_kabelya * (vesKabelya / 1000)) + "кг");
        this.$('#result h1').append("<br>Cумма веса барабанов и веса намотанного на него кабеля: " + ((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))) );
        this.$('#result h1').append("<hr>");*/
        if(without_baraban){
            cable_mark = this.$('select[name=cable_mark] option:selected').html();
            result_text = "<b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b> <br>в количестве: <b style='color: #ef3c39;'>";
            result_text += lenght_kabelya + " м</b> <br>будет иметь массу: <b style='color: #ef3c39;'>" + (lenght_kabelya * (vesKabelya / 1000)).toFixed(1) + " кг</b>";
            result_text += "<br>диаметр <b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b> - <b style='color: #ef3c39;'>" + (diametr.toFixed(4) * 1000) + " мм</b>";
            this.$('#result').html(result_text);
            this.$('#result').show(300);
            this.$('.additional_data').hide();
            this.$('.js-show-additional_data').hide();
        } else {
            result = 3.14 * lengthsheiki * ( Math.pow(diametrscheki, 2) - Math.pow(diametrsheiki, 2) )/(4 * Math.pow(diametr, 2));
            result_barabans = Math.ceil(parseInt(this.$('input[name=metrs]').val()) / result );
            
            this.$('input[name=diam_kabelya]').val(diametr*1000);
            this.$('input[name=des_kabelya]').val(parseFloat(this.filtered_cable.filter(function(type){
                    return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
                })[0].massa)/1000);
            obshiy_ves = (((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))).toFixed(0));
            cable_mark = this.$('select[name=cable_mark] option:selected').html();
            result_text = "<tr>";
            result_text +="<td>" + this.$('select[name=baraban] option:selected').html() + "</td>";
            result_text += "<td>" + result_barabans + "</td>";
            result_text += "<td>" + ((result_barabans * this.filtered_barabans.obem_barabana).toFixed(1)) + "</td>";
            result_text += "<td>" + (((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))).toFixed(0)) + "</td>";
            result_text += "</tr>";
            if( parseInt(this.$('input[name=diametrsheiki]').val()) < (25*parseInt(this.$('input[name=diam_kabelya]').val())) ){
                return result_text;
            } else {
                return ''
            } 
            /*result = 3.14 * lengthsheiki * ( Math.pow(diametrscheki, 2) - Math.pow(diametrsheiki, 2) )/(4 * Math.pow(diametr, 2));
            result_barabans = Math.ceil(parseInt(this.$('input[name=metrs]').val()) / result );
            
            this.$('input[name=des_kabelya]').val(parseFloat(this.filtered_cable.filter(function(type){
                    return parseInt(type.id) == parseInt(that.$('select[name=sechenie]').val())
                })[0].massa)/1000);
            obshiy_ves = (((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))).toFixed(0));
            cable_mark = this.$('select[name=cable_mark] option:selected').html();
            result_text = "<br>Для <b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b> в количестве:  <b style='color: #ef3c39;'>";
            result_text += lenght_kabelya + " м</b><br>необходимо барабанов <b>№ " + this.$('select[name=baraban] option:selected').html() + "</b>: ";
            result_text += "  <b style='color: #ef3c39;'>" + result_barabans + " шт</b><br>";
            result_text += "<ul><li> общий объем:  <b style='color: #ef3c39;'>" + ((result_barabans * this.filtered_barabans.obem_barabana).toFixed(1)) + " м³</b></li>";
            result_text += "<li>общий вес:  <b style='color: #ef3c39;'>" + (((result_barabans * this.filtered_barabans.ves_barabana) + (lenght_kabelya * (vesKabelya / 1000))).toFixed(0)) + " кг</b></li></ul>";
            
            additionl_result = "<br>Объем барабана № <b>" + nomer_barabana + "</b>:  <b style='color: #ef3c39;'>" + this.$('input[name=obembarabana]').val() + " м³</b><br>";
            additionl_result += "Вес барабана № <b>" + nomer_barabana + "</b> с обшивкой:  <b style='color: #ef3c39;'>" + this.filtered_barabans.ves_barabana + " кг</b><br>";
            additionl_result += "Диаметр <b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b>:  <b style='color: #ef3c39;'>" + (diametr*1000) + " мм</b><br>";
            additionl_result += "Вес 1м <b>" + cable_mark + " " + this.$('select[name=sechenie] option:selected').html() + "</b>:  <b style='color: #ef3c39;'>" + (vesKabelya / 1000) + " кг</b><br>";
            */

            /*this.$('#result').html(result_text);
            this.$('.additional_data').html(additionl_result);
            this.$('#result').show(300);
            this.$('.js-show-additional_data').show(300);*/
        }
    },
    submit: function(e){
        e.preventDefault();
        this.calculate();
        var that = this,
            htmlResult = "<b>" + this.$('select[name=cable_mark] option:selected').html() + " " + this.$('select[name=sechenie] option:selected').html() + "</b> <br>в количестве: <b style='color: #ef3c39;'>" + this.$('input[name=metrs]').val() + " м</b><br>";
            htmlResult += '<table border="1"><tr><th>№ барабана</th><th>количество барабанов(шт)</th><th>общий объем(м³)</th><th>общий вес(кг)</th></tr>';
        _.each(this.$('select[name=baraban]>option'), function(el, key){
            that.$('select[name=baraban]').val($(el).val());
            that.changeBarabanMark();
            that.changeCableMark();
            htmlResult += that.calculate();
        });
        this.$('#result').html(htmlResult);
        this.$('#result').show(300);
    }
});

$(function() {
    if($('#calcForm').length>0){
        $.ajax({
            url: 'http://www.a-kabel.ru/index.php?option=com_hello&view=hello',
            type: 'GET',
            beforeSend: function() {
                // TODO: show your spinner
                $('#ajaxSpinner').show();
                $('#calcForm').hide();
            },
            complete: function() {
                // TODO: hide your spinner
                $('#ajaxSpinner').hide();
            },
            success: function(data) {
                $('#calcForm').show(100, function(){
                    calcDB = $.parseJSON(data);
                    var test = new view({el:'#calcForm'});                    
                });
            }
        });
    }
});