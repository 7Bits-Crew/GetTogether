using API.Models.DTO;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace API.Data.Validation
{
    public class UserValidation
    {
        public bool Email(string e) {
            var valid = true;

            try
            {
                var emailAddress = new MailAddress(e);
            }
            catch
            {
                valid = false;
            }

            return valid;
        }
        public bool PhoneNumber(string n) {
            string motif = @"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";

            if (n != null)
                return Regex.IsMatch(n, motif);
            else 
                return false;
        }

        public bool Name(string n) {
            return n.Length > 3;
        }
        public bool Password(string n) {
            return n.Length > 3;
        }
        public bool RegisterUser(UserDTO user, out string err) {
            if (!Name(user.Name))
            {
                err = "Name";
                return false;
            }
            else if (!Password(user.Password))
            {
                err = "Password";
                return false;
            }
            else if (!Email(user.Email))
            {
                err = "Email";
                return false;
            }
            else if (!PhoneNumber(user.PhoneNamber)) {
                err = "Phone";
                return false;
            }
            err = "";
            return true;
        }
    }
}
