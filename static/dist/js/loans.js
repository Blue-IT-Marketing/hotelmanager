<script type="text/javascript">
    $(document).ready(function(){
        $('#EmploymentDetailsButt').click(function(){

             var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
             var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/employmentdetails",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#EmploymentDetailsInfoDiv').html(html)
                  }
              });
          });
      });
</script>
<script type="text/javascript">
    <!-- Credit Provider Form Loader -->
    $(document).ready(function(){
        $('#CreditProviderButt').click(function(){

            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;

            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/creditprovider",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#CreditProviderDivINF').html(html)
                  }
              });

          });
      });
</script>
<script type="text/javascript">
    <!-- Credit Provider Form Loader -->
    $(document).ready(function(){
        $('#LoanReceiverDetailsButt').click(function(){

            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;

            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/loanreceiver",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#ReceiverDetailsDiv').html(html)
                  }
              });

          });
      });
</script>
<script type="text/javascript">
    <!-- Credit Provider Form Loader -->
    $(document).ready(function(){
        $('#IncomeExpenditureButt').click(function(){
            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/incomeexpenditure",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#IncomeExpenditureDivINF').html(html)
                  }
              });
          });
      });
</script>
<script type="text/javascript">
    $(document).ready(function(){
        $('#AdvancedAmountButt').click(function(){
            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/advancedamount",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#AdvancedAmountInfoDiv').html(html)
                  }
              });

          });
      });
</script>
<script type="text/javascript">
    $(document).ready(function(){
        $('#ClientBankingButt').click(function(){
            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/clientbankingdetails",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#ClientBankingDetailsDIVINF').html(html)
                  }
              });

          });
      });
</script>
<script type="text/javascript">
    function isNumber(n){
    return typeof(n) != "boolean" && !isNaN(n);
}
</script>
<script type="text/javascript">
function getAge(dateString) {

    var dates = dateString.split("-");
    var d = new Date();

    var userday = dates[2];
    var usermonth = dates[1];
    var useryear = dates[0];

    var curday = d.getDate();
    var curmonth = d.getMonth()+1;
    var curyear = d.getFullYear();

    var age = curyear - useryear;

    if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){
        age--;
    }
    return age;
}
</script>
<script type="text/javascript">
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
</script>
<script type="text/javascript">
    $(document).ready(function(){
        $('#CreateLoanApplicant').click(function(){

            var vstrAccountNumber = document.getElementById('strAccountNumber').value;
            var vstrTitle = document.getElementById('strTitle').value;
            var vstrSurname = document.getElementById('strSurname').value;
            var vstrFullnames = document.getElementById('strFullnames').value;
            var vstrIDNumber = document.getElementById('strIDNumber').value;
            var vstrDateofBirth = document.getElementById('strDateofBirth').value;
            var vstrNationality = document.getElementById('strNationality').value;
            var vstrHouseNumber = document.getElementById('strHouseNumber').value;
            var vstrCityTown = document.getElementById('strCityTown').value;
            var vstrResidentialProvince = document.getElementById('strProvince').value;
            var vstrResidentialCountry = document.getElementById('strCountry').value;
            var vstrResidentialPostalCode = document.getElementById('strPostalCode').value;

            var vstrBoxNumber = document.getElementById('strBoxNumber').value;
            var vstrPostalCityTown = document.getElementById('strPostalCityTown').value;
            var vstrPostalProvince = document.getElementById('strPostalProvince').value;
            var vstrPostalCountry = document.getElementById('strPostalCountry').value;
            var vstrPostalCode = document.getElementById('strPostalPostalCode').value;

            var vstrDayTimeNumber = document.getElementById('strTel').value;
            var vstrCellNumber = document.getElementById('strCell').value;
            var vstrEmail = document.getElementById('strEmail').value;
            var vstrNextOfKinNames = document.getElementById('strNextOfKinNames').value;
            var vstrNextOfKinAddress = document.getElementById('strNextOfKinAddress').value;
            var vstrNextOfKinCell = document.getElementById('strNextOfKinCell').value;

            var dataString = '&vstrAccountNumber=' + vstrAccountNumber + '&vstrTitle=' + vstrTitle + '&vstrSurname='+ vstrSurname +
                    '&vstrFullnames='+ vstrFullnames + '&vstrIDNumber=' + vstrIDNumber + '&vstrDateofBirth=' + vstrDateofBirth +
                    '&vstrNationality='+ vstrNationality + '&vstrHouseNumber=' + vstrHouseNumber + '&vstrCityTown=' + vstrCityTown + '&vstrResidentialProvince=' + vstrResidentialProvince +
                    '&vstrResidentialCountry=' + vstrResidentialCountry + '&vstrResidentialPostalCode=' + vstrResidentialPostalCode + '&vstrBoxNumber=' + vstrBoxNumber +
                    '&vstrPostalCityTown=' + vstrPostalCityTown + '&vstrPostalProvince=' + vstrPostalProvince + '&vstrPostalCountry=' + vstrPostalCountry +
                    '&vstrPostalCode=' + vstrPostalCode + '&vstrDayTimeNumber=' + vstrDayTimeNumber + '&vstrCellNumber=' + vstrCellNumber + '&vstrEmail=' + vstrEmail + '&vstrNextOfKinNames=' +
                    vstrNextOfKinNames + '&vstrNextOfKinAddress=' + vstrNextOfKinAddress + '&vstrNextOfKinCell=' + vstrNextOfKinCell;
            $.ajax({
                type: "post",
                url: "/employees/loans",
                data: dataString,
                cache: false,
                success: function (html) {
                    $('#LoansDivINF').html(html)
                }
            });
        });
      });
</script>
<script type="text/javascript">
    $(document).ready(function(){
       $('#DynamicHeader').load("/navigation/header")
    });
</script>
<script type="text/javascript">
    $(document).ready(function(){
       $('#DynamicSideBar').load("/navigation/sidebar")
    });
</script>
<script type="text/javascript">
    $(document).ready(function(){
        $('#CloseActivePolicyButt').click(function(){
            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/closeaccountnumber",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#CloseActivePolicyINFDIV').html(html)
                  }
              });

          });
      });
</script>
<script type="text/javascript">
    $(document).ready(function(){
        $('#CreateFileButt').click(function(){
            var varstrAccoutNumber = document.getElementById('strAccountNumber').value;
            var dataString = '&vstrAccountNumber=' + varstrAccoutNumber;
              $.ajax({
                    type: "get",
                    url: "/loans/createfile",
                    data: dataString,
                    cache: false,
                  success: function(html){
                    $('#DashBoardInfoDiv ').html(html)
                  }
              });

          });
      });
</script>