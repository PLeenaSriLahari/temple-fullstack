package com.klef.temple.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.temple.model.Temple;
import com.klef.temple.repository.TempleRepository;

@Service
public class TempleServiceImpl implements TempleService {

    @Autowired
    private TempleRepository templeRepository;

    @Override
    public Temple addTemple(Temple temple) {
        return templeRepository.save(temple);
    }

    @Override
    public List<Temple> getAllTemples() {
        return templeRepository.findAll();
    }

    @Override
    public Temple getTempleById(int id) {
        Optional<Temple> opt = templeRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Temple updateTemple(Temple temple) {
        return templeRepository.save(temple);
    }

    @Override
    public void deleteTempleById(int id) {
        templeRepository.deleteById(id);
    }
}
