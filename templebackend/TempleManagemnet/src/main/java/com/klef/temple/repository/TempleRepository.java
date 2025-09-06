package com.klef.temple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.temple.model.Temple;

@Repository
public interface TempleRepository extends JpaRepository<Temple, Integer> {
 
}
