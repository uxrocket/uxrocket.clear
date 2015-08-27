/**
 * @author Bilal Cinarli
 */

var expect = chai.expect;

describe('Testing UX Rocket Clear', function() {
    var $inputs = {},
        clear = {},
        defaults = $.uxrclear.settings,
        namespace = $.uxrclear.namespace,
        data = namespace.data;

    before(function() {
        // prepare the elements
        $("#elements")
            .append('<input type="text" name="clear-01" id="cl01" />')
            .append('<input type="text" name="clear-02" id="cl02" />')
            .append('<input type="text" name="clear-03" id="cl03" />');

        $inputs["_01"] = $("#cl01");
        $inputs["_02"] = $("#cl02");
        $inputs["_03"] = $("#cl03");

        $inputs._01.addClass('clear');

        $inputs._02.wrap('<label class="uxr-plugin-wrap previously-wrapped"></label>');

        $.each($inputs, function(item) {
            $inputs[item].clear();

            clear[item] = $inputs[item].data(data);
        });
    });

    describe('Properties', function() {
        it('uxrclear.version', function() {
            expect($.uxrclear).to.have.property('version');
        });

        it('uxrclear.settings', function() {
            expect($.uxrclear).to.have.property('settings');
        });

        it('unique _instance', function() {
            var instances = [];

            $.each(clear, function(item) {
                expect(clear[item]._instance).to.exist;
                expect($.inArray(clear[item]._instance, instances)).to.be.equal(-1);

                instances.push(clear[item]._instance);
            });
        });
    });

    describe('Layout Setup', function() {
        it('Ready Class: "uxr-clear-ready"', function() {
            expect($inputs._01.hasClass('uxr-clear-ready')).to.be.equal(true);
        });

        it('Wrapper Classlist', function() {
            expect(clear._01.classList).to.be.equal('clear uxr-plugin-wrap uxr-clear-wrap uxr-clear-wrap-1');
        });

        it('Should wrapped with <span> if not wrapped before', function() {
            var $parent = $inputs._01.parent();
            expect($parent.is('span, .uxr-clear-wrap')).to.be.equal(true);
        });

        it('Should not wrapped again, only "classList" should transferred', function() {
            var $parent = $inputs._02.parent();
            expect($parent.is('label, .uxr-plugin-wrap, .uxr-clear-wrap')).to.be.equal(true);
        });
    });

    describe('Internal Method', function(){
       describe('Clean Up', function(){
         it('Should remove the plugin wrapper and icon when element is removed', function(){
             var instance = clear["_01"]._instance,
                 el = document.getElementById('cl01');

             el.parentNode.removeChild(el);

             expect($('uxr-clear-wrap-' + instance).length).to.be.equal(0);
         });
       });
    });

    describe('Public Methods', function() {
        describe('Update', function() {
            it('Will update plugin settings', function() {

            });
        });

        describe('Destroy/Remove', function() {
            it('Will destroy plugin', function() {
                clear._02.destroy();

                expect($inputs._02.data(data)).to.be.undefined;
            });

            it('Will destroy all clear plugins', function() {
                $.uxrclear.destroy();

                // $input1 is already destroyed in previous test, so we only control the $input2
                expect($inputs._03.data(data)).to.be.undefined;
            });
        });
    });
});