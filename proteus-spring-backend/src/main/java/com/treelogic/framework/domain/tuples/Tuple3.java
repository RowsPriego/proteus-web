package com.treelogic.framework.domain.tuples;

public class Tuple3<T,K,V> {

	T t1;
	K t2;
	V t3;
	
	public Tuple3(T t1, K t2, V t3){
		this.t1 = t1;
		this.t2 = t2;
		this.t3 = t3;
	}
	
	public T getT1() {
		return t1;
	}
	public void setT1(T t1) {
		this.t1 = t1;
	}
	public K getT2() {
		return t2;
	}
	public void setT2(K t2) {
		this.t2 = t2;
	}
	public V getT3() {
		return t3;
	}
	public void setT3(V t3) {
		this.t3 = t3;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((t1 == null) ? 0 : t1.hashCode());
		result = prime * result + ((t2 == null) ? 0 : t2.hashCode());
		result = prime * result + ((t3 == null) ? 0 : t3.hashCode());
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
		Tuple3 other = (Tuple3) obj;
		if (t1 == null) {
			if (other.t1 != null)
				return false;
		} else if (!t1.equals(other.t1))
			return false;
		if (t2 == null) {
			if (other.t2 != null)
				return false;
		} else if (!t2.equals(other.t2))
			return false;
		if (t3 == null) {
			if (other.t3 != null)
				return false;
		} else if (!t3.equals(other.t3))
			return false;
		return true;
	}
	
}
