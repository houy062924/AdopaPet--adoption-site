import React from "react";


class AdoptionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      birthdate: "",
      address: "",
      phone: "",
      email: "",
      pets: "",
      housetype: "House-with-yard",
      visitdate: "",
      other: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleAdoptForm = this.toggleAdoptForm.bind(this);
    this.handleAdoptFormDb = this.handleAdoptFormDb.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  toggleAdoptForm() {
    this.props.functions.toggleAdoptForm();
  }
  handleAdoptFormDb() {
    let adoptionform = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
      pets: this.state.pets,
      housetype: this.state.housetype,
      visitdate: this.state.visitdate,
      other: this.state.other,
    }

    this.props.functions.handleAdopt(adoptionform);
  }

  render() {
    return (
      <div className="adoptFormCont">
        <div className="formTitle">Application Form</div>
        <form onSubmit={(e)=> {
                e.preventDefault();
                this.handleAdoptFormDb()
              }}>
          <div className="inputCont">
            <label htmlFor="name">Full Name*</label>
            <input 
              required
              id="name" 
              name="name" 
              type="text"
              maxLength="50"
              value={this.state.name}
              onChange={this.handleInputChange}/>
          </div>
          <div className="inputCont">
            <label htmlFor="birthday">Birthdate*</label>
            <input 
              required
              id="birthdate" 
              name="birthdate" 
              type="date"
              value={this.state.birthdate}
              onChange={this.handleInputChange}/>
          </div>
          <div className="inputCont">
            <label htmlFor="address">Address*</label>
            <input 
              required
              id="address" 
              name="address" 
              type="text"
              value={this.state.address}
              onChange={this.handleInputChange}/>
          </div>
          <div className="inputCont selectCont">
            <label htmlFor="housetype">House Type*</label>
            <select id="housetype" name="housetype" onChange={this.handleInputChange}>
              <option value="House-with-yard">House with yard</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Apartment">Apartment</option>
              <option value="Rentalroom">Rental Room</option>
              <option value="Dorm">Dorm</option>
            </select>
          </div>
          <div className="inputCont">
            <label htmlFor="phone">Phone*</label>
            <input 
              required
              id="phone" 
              name="phone" 
              type="text"
              value={this.state.phone}
              onChange={this.handleInputChange}/>
          </div>
          <div className="inputCont">
            <label htmlFor="email">Email*</label>
            <input 
              required
              id="email" 
              name="email" 
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}/>
          </div>
          <div className="radioCont">
            <label className="radioLabel">Current Pets*</label>
            <label htmlFor="pet-no" className="radioLabel">
              <input 
                type="radio" 
                id="pet-no" 
                name="pets" 
                value="No"
                onChange={this.handleInputChange} 
              />
              <span>No, I do not have other pets.</span>
            </label>
            <label 
              htmlFor="pet-yes" 
              className="radioLabel"
            >
              <input 
                type="radio" 
                id="pet-yes" 
                name="pets" 
                value="Yes" 
                onChange={this.handleInputChange} 
              />
              <span>Yes, I currently have pets.</span>
            </label>
          </div>
          <div className="inputCont">
            <label htmlFor="visitdate">Visit Date*</label>
            <input 
              required
              id="visitdate" 
              name="visitdate" 
              type="date"
              value={this.state.date}
              onChange={this.handleInputChange}/>
          </div>
          <div className="inputCont">
            <label htmlFor="other">Other*</label>
            <textarea 
              required
              id="other"
              name="other"
              value={this.state.other}
              onChange={this.handleInputChange}>
            </textarea>
          </div>

          <div className="formButtonCont">
            <div
              className="cancelButton"
              onClick={this.toggleAdoptForm}>
                Cancel
            </div>
            <button
              type="submit"
              className="submitButton">
                Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AdoptionForm;
