package com.treelogic.framework.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class SensorMeasurement{

	protected int coilId;
	protected int varName;
	protected double value;
	protected byte type;
	protected double x;

	public SensorMeasurement() {
		if( this.getClass() == SensorMeasurement2D.class){
			this.type = 0x1;
		}
		else{
			this.type = 0x0;
		}
	}

	public String toJson() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public int getCoilId() {
		return coilId;
	}

	public void setCoilId(int coilId) {
		this.coilId = coilId;
	}

	public int getVarName() {
		return varName;
	}

	public void setVarName(int varName) {
		this.varName = varName;
	}

	public double getValue() {
		return value;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public byte getType() {
		return type;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + coilId;
		result = prime * result + type;
		long temp;
		temp = Double.doubleToLongBits(value);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + varName;
		temp = Double.doubleToLongBits(x);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SensorMeasurement other = (SensorMeasurement) obj;
		if (coilId != other.coilId)
			return false;
		if (type != other.type)
			return false;
		if (Double.doubleToLongBits(value) != Double.doubleToLongBits(other.value))
			return false;
		if (varName != other.varName)
			return false;
		if (Double.doubleToLongBits(x) != Double.doubleToLongBits(other.x))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Row [coilId=" + coilId + ", varName=" + varName + ", value=" + value + ", type=" + type + ", x=" + x
				+ "]";
	}


}