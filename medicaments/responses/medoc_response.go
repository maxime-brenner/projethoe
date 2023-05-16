package responses

type Substance struct {
	Cis             string `json:"cis"`
	FormeGalenique  string `json:"formeGalenique"`
	CodeSubstance   string `json:"codeSubstance"`
	Name            string `json:"name"`
	DoseUnitaire    string `json:"doseUnitaire"`
	ReferenceDosage string `json:"referenceDosage"`
}
